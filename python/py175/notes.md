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
{% extends "layout.html" %}

{% block content %}
<h2 class="content-subhead">Table of Contents</h2>

<div class="pure-menu">
  <ul class="pure-menu-list">
    {% for chapter in contents %}
      <li class="pure-menu-item">
        <a href="#" class="pure-menu-link">{{ chapter }}</a>
      </li>
    {% endfor %}
  </ul>
</div>
{% endblock %}
```

```html
{% extends "layout.html" %}

{% block content %}
  <h2 class="content-subhead">{{ chapter_title }}</h2>

  {{ chapter }}

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
