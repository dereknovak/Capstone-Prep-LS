def error_for_list_title(title, lists):
    if any(lst['title'].lower() == title.lower() for lst in lists):
        return "The title must be unique."
    elif not 1 <= len(title) <= 100:
        return "The title must be between 1 and 100 characters"
    else:
        return None
    
def error_for_new_list_title(new_title, old_title, lists):
    if old_title == new_title:
        return "That's the same name!"
    if any(lst['title'].lower() == new_title.lower() for lst in lists):
        return "The title must be unique."
    elif not 1 <= len(new_title) <= 100:
        return "The title must be between 1 and 100 characters"
    else:
        return None
    
def error_for_todo_title(title):
    if not 1 <= len(title) <= 100:
        return "The title must be between 1 and 100 characters"
    else:
        return None
    
def find_list_by_id(list_id, lists):
    return next((lst for lst in lists if lst['id'] == list_id), None)

def find_todo_by_id(todo_id, lst):
    return next((todo for todo in lst if todo['id'] == todo_id), None)