# WSGI
https://launchschool.com/lessons/9904914e/assignments/1fa6e971

- Web Server Gateway Interface
- "Essentially, WSGI is a specification -- a set of rules and guidelines -- that outlines how web servers should communicate with web applications written in Python."

# Werkzeug
- A toolkit that includes a range of utilities for web applications and also serves as a WSGI utility library
- "Werkzeug is a library that Flask uses to handle low-level tasks, like processing HTTP requests and responses between the web server and the Flask application"

# Creating a Flask Project

## 1

1.  Make sure you have Python 3.8 or higher installed. You can check with:
   
```
python --version
```

2.  Create a centralized directory for virtual environments if you don't already have one:

```   
mkdir -p ~/.venv
```

3.  Create a virtual environment specifically for this project:

```
python -m venv ~/.venv/[APP NAME]
```

4.  Activate the virtual environment:
```       
source ~/.venv/[APP NAME]/bin/activate
```  
        
## 2
- Navigate to Project Directory

## 3
Install pipx and Poetry

1.  Install pipx (if not already installed):

```
pip install pipx
pipx ensurepath
```

- Note: You may need to restart your terminal after running pipx ensurepath

2.  Install Poetry using pipx:

```   
pipx install poetry
```

## 4
Install Flask

- Ensure you have a `pyproject.toml` file with dependencies

```
poetry add flask

OR

poetry lock
poetry install
```
If you encounter any error messages (especially on Cloud9), you may need to troubleshoot according to the instructions provided in the assignment.

## 5
Run the Application

```
poetry run python app.py
```

# Block content

- Use within `layout.html` to allow it to be used as a layout

```html
  <body>
    <header>
      <h1>Todo Tracker</h1>
      <div class="actions">
        {% block header_links %}
        <!-- Filled in by the `header_links` block from another template file -->
        {% endblock %}
      </div>
    </header>
    <main>
      {% block content %}
      <!-- Filled in by the `content` block from another template file -->
      {% endblock %}
    </main>
  </body>
</html>
```

```html
{% extends 'layout.html' %}

{% block content %}
  {% if lists %}
    <p>You have some lists. We need to display them.</p>
  {% else %}
    <p id="no_list">You don't have any todo lists. Why not create one?</p>
  {% endif %}
{% endblock %}

{% block header_links %}
  <a class="add" href="/lists/new">New List</a>
{% endblock %}
```

# Similarities to other Frameworks

- Flask (Dependency Manger) => Bundler (Ruby)
- poetry.lock => Gemfile.lock (Ruby)
- static folder => public folder (JS)
- Jinja2 (templater) => ERB (Ruby)
    - Use `{{ variable }}` to insert into `html` file
- templates folder => views (Ruby)
- `@app.before_request` => `before` (Ruby)
- `@app.errorhandler(404)` => `not_found` (Ruby)
- render_template('file.html') => erb :file (Ruby)
- Templating with Jinja2
    - `{{ variable }}` => `<%= variable %>` (Ruby)
    - `{% statement %}` => `<% statement %>` (Ruby)
- session => session (Ruby)
- Accessing form input:
    - `request.form['input_for'].strip()` => `params[:list_for].strip` (Ruby)
- ANY TIME YOU MODIFY SESSION
    - Include `session.modified = True` to allow temporary modification