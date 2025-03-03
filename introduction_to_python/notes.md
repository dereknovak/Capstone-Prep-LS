Started 03-02

# Data Types
https://launchschool.com/books/python/read/data_types

1. Primitive
    - Integers `int`
    - Floats `float`
    - Boolean `bool`
    - Strings `str`
2. Non-Primitive
    - Ranges `range`
    - Tuples `tuple`
    - Lists `list`
    - Dictionaries `dict`
    - Sets `set`
    - Frozen Sets `frozenset`
3. Other
    - Functions `function`
    - NoneType `NoneType`

## Integers

```py
1
2
-3
234891234
131_587_465_014_410_491
```

## Floats

```py
1.0
1.4142
-3.14159
42348.912346
131_587_465.014_410_491
```

## Booleans

```py
toggle_on = True
session_active = False

3 + True   # 4
True == 1  # True
```

## Strings

```py
'Hello!'
"He's pining for the fjords!"
'1969-07-20'
```

### String Block

```py
'''King Arthur: "What is your name?"
Black Knight: "None shall pass!"
King Arthur: "What is your quest?"
Black Knight: "I have no quarrel with you,
               but I must cross this bridge."
'''

print("""My nickname is "Wolfy". What's yours?""")  # Both quotes used
```

### Indexing

- Supports end-indexing via negative integers
```py
my_str = 'launch'

my_str[1]   # a
my_str[-1]  # h
my_str[-2]  # c
```

### Raw Strings

- Raw Strings (preceded by `r`) do not recognize escapes

```py
# Both of these print C:\Users\Xyzzy
print("C:\\Users\\Xyzzy")  # Each \\ produces a literal \
print(r"C:\Users\Xyzzy")   # raw string literal
```

### F-Strings

- Formatted String Literals
- Allow for string interpolation

```py
f'5 plus 5 equals {5 + 5}.'  # 5 plus 5 equals 10.

my_name = 'Karl'
f'My name is {my_name}.'  # My name is Karl
```

## NoneType

- Represents the absence of a value

```py
problems = None
```

## Sequences

- An ordered collection of objects

### Lists

- Mutable

```py
my_list = [1, 'xyz', True, [2, 3, 4]]

my_list[2]  # True
```

### Tuple

- Immutable

```py
my_tuple = ('xyz', [2, 3, 4], 1, True)

my_tuple[2]  # 1
```

### Ranges

- Sequence of integers between 2 endpoints.
- Arguments:
    1. 0 => num - 1
    2. start => num - 1
    3. start => num - 1, increment value

```py
tuple(range(5))         # (0, 1, 2, 3, 4)
tuple(range(5, 10))     # (5, 6, 7, 8, 9)
list(range(1, 10, 2))   # [1, 3, 5, 7, 9]
list(range(0, -5, -1))  # [0, -1, -2, -3, -4]
```

- Is its own data structure

```py
my_range = range(5, 10)
my_range[1]  # 6
```

## Mappings

- Unordered collection of objects
    - Dictionary is most common

### Dictionary

- Collection of K/V pairs (JS: object, RB: hash)

```py
user = {
  'name': 'Derek',
  'age': 31,
}
```

## Sets

- Unordered collection of *unique* members

```py
empty_set = set()
empty_set    # set()

literal_set = { 2, 3, 5, 7, 11, 13 }
literal_set  # {2, 3, 5, 7, 11, 13}

string_set = set('hello there!')
string_set   # {'t', 'o', 'e', 'l', ' ', 'h', '!', 'r'}
```

### Frozen Sets

- Immutable sets
- Cannot use literal syntax

```py
frozen_set = frozenset([1, 2, 3])
frozen_set  # frozenset({1, 2, 3})
```

## Determining Type

- Use `type` constructor to return the type of an expression

```py
print(type(1))         # <class 'int'>
print(type(3.14))      # <class 'float'>
print(type(True))      # <class 'bool'>
print(type('abc'))     # <class 'str'>
print(type([1, 2, 3])) # <class 'list'>
print(type(None))      # <class 'NoneType'>
```

- Access the `__name__` for the name of the class

```py
type(1).__name__  # 'int'
```

- Use `is` to return a boolean

```py
type('abc') is str  # True
```

## Log value as Type

- Use `repr` function to print the object literal rather than string representation

```py
my_str = 'abc'

print(my_str)        #  abc
print(repr(my_str))  # 'abc'
```

## Length

- Use `len` function to access the length of the object

```py
print(len('Launch School'))        # 13
print(len(range(5, 15)))           # 10
print(len(range(5, 15, 3)))        # 4
print(len(['a', 'b', 'c']))        # 3
print(len(('d', 'e', 'f', 'g')))   # 4
print(len({'foo': 42, 'bar': 7}))  # 2
print(len({'foo', 'bar', 'qux'}))  # 3
```

# Truthiness

## Falsey Values

- Everything else is truthy

```py
False
None 
0, 0.00                               # Any number == 0
''                                    # Empty String
[], (), set(), frozenset(), range(0)  # Empty Data Sets
```

## any/all

- `any` returns `True` if any value is truthy
- `all` returns `False` if any value is falsey

# Functions

- Must use an explicit return
    - Functions implicitly return `None`
- Use `:` after function's definition
- Variables have *function scope*
    - Can access variables from the outside, but not other way around
    - We don't declare variables in Python, so variable shadowing can occur more easily
    - `if...else` blocks do not create a new scope
- Functions have *strict arity*
- Functions that always return a boolean are called **predicates**

```py
def add(a, b):
    return a + b

add(3, 5)  # 8
```

# Unique Python Things

## //

- Rounds down to nearest integer after division

```py
25 // 4   # 6
-25 // 4  # -7
```

## List and Set Operators

- '+'
    - Lists
    - Sets must use `|=` instead (set union)
- '-'
    - Sets

```py
array = [1, 2, 3]
array += [4, 5, 6]
array  # [1, 2, 3, 4, 5, 6]

nums = {1, 3, 5, 7}
nums -= {3, 5}
nums   # {1, 7}
```

## Slicing

- `list[start:stop]`
- `list[start::next]` (only once)
- Start empty defaults to 0
- Stop empty defaults to list length
- ` 

```py
seq = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
print(seq[3:7])       # [4, 5, 6, 7]
print(seq[-6:-2])     # [5, 6, 7, 8]
print(seq[2:8:2])     # [3, 5, 7]
print(seq[3:3])       # []
print(seq[:])         # [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
print(seq[::-1])      # [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
```

COME BACK TO ID/DIR

# Similar functions

- index => indexOf
- zip() => zip (Ruby)
- dict.keys() => Object.keys()
    - Returns a dictionary view object
        - Any mutations to dict will be reflected here
- dict.values() => Object.values()
- dict.items() => Object.entries()
- append => push
- insert(index, val) => splice()
- pop(index) => pop() (defaults to last element)
- sort(reverse=True)
String
- capitalize (same as Ruby)
    - title (capitalizes every word)
        - capwords is better
- swapcase (same as Ruby)
- split (same as Ruby)
- get => Set.get() (if not found, returns `None`)
- join is a *string method* rather than a list method
    - `delimiter.join(list)`
- replace => replace
- in => operator similar to includes or include?
- continue (keyword) => continue (JS)
- LOOK MORE INTO COMPREHENSIONS
- import => require
    - math => Math
    - datetime => Date