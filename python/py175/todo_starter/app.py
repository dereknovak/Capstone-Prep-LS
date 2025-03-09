from uuid import uuid4

from flask import (
    flash,
    Flask,
    redirect,
    render_template,
    request,
    session,
    url_for
)

from werkzeug.exceptions import NotFound
from todos.utils import (
    error_for_list_title,
    error_for_todo_title,
    find_list_by_id
)

app = Flask(__name__)
app.secret_key='secret1'

@app.before_request
def initialize_session():
    if 'lists' not in session:
        session['lists'] = []

@app.route("/")
def index():
    return redirect(url_for('get_lists'))

@app.route("/lists")
def get_lists():
    lists = [
        {'title': 'Lunch Groceries', 'todos': []},
        {'title': 'Dinner Groceries', 'todos': []}
    ]

    return render_template('lists.html', lists=session['lists'])

@app.route('/lists', methods=['POST'])
def create_list():
    title = request.form["list_title"].strip()

    error = error_for_list_title(title, session['lists'])
    if error:
        flash(error, "error")
        return render_template('new_list.html', title=title)

    session['lists'].append({
        'id': str(uuid4()),
        'title': title,
        'todos': [],
    })

    flash("The list has been created.", "success")
    session.modified = True
    return redirect(url_for('get_lists'))

@app.route('/lists/new')
def add_todo_list():
    return render_template('new_list.html')

@app.route('/lists/<list_id>')
def show_list(list_id):
    lst = find_list_by_id(list_id, session['lists'])
    if not lst:
        raise NotFound(description='List not found')
    # return str(lst)
    return render_template('list.html', lst=lst)

@app.route('/lists/<list_id>/todos', methods=['POST'])
def add_todo(list_id):
    lst = find_list_by_id(list_id, session['lists'])
    todo_title = request.form['todo'].strip()

    if not lst:
        raise NotFound(description='List not found')

    error = error_for_todo_title(todo_title)
    if error:
        flash(error, "error")
        return render_template('list.html', lst=lst)

    lst['todos'].append({
        'id': str(uuid4()),
        'title': todo_title,
        'completed': False,
    })

    flash(f'"{todo_title} has been added to the list')
    session.modified = True

    return redirect(url_for('show_list', list_id=list_id))


if __name__ == "__main__":
    app.run(debug=True, port=5003)