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

- `list[start:stop:step]`
- Start empty defaults to 0
- Stop empty defaults to list length
- Step empty defaults to 1

```py
seq = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
print(seq[3:7])       # [4, 5, 6, 7]
print(seq[-6:-2])     # [5, 6, 7, 8]
print(seq[2:8:2])     # [3, 5, 7]
print(seq[3:3])       # []
print(seq[:])         # [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
print(seq[::-1])      # [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
print(seq[::2])       # [1, 3, 5, 7, 9]
```

# Sorting

## sort

- Mutates the list in place and returns `None`

## sorted

- Returns a copy of the list, sorted

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
- lower() => toLowerCase (JS) downcase (Ruby)
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
- Similar to Ruby, if we don't use a variable, use `_`
- input() => gets() (Ruby)
- `random` is its own module
- Python can detect if a variable is declared within the scope of its execution - if this occurs after the execution, Python will raise an error
```py
a = 1

def my_function():
    print(a)
    a = 2

my_function()
```
- list(string) => split('')
- isinstance(value, literal) => typeof
- to delete a property within a dictionary, use `del` keyword
- abs() => Math.abs (Do not need math module)
- LOOK INTO REGEX
    - Specifically matching

# Object Oriented Programming

## Magic Method

- Magic methods are any methods whose name begins and ends with a double underscore.
- `__init__`

```py
print(f'I am a {type(derek).__name__} object')
print(f'I am a {derek.__class__.__name__} object')
```

### __str__

- Returns a string representation of object
- Can be overridden in your class
- When searching for `str` constructor function, Python looks for `__str__` in ancestor chain. If none is found, it does the same thing for `__repr__`. If none is found, a string like `<__main__.MyType object at 0x1052828a0>` is returned
    - This is the same process for `repr`, but without searching `__str__` first

```py
class Cat:

    def __init__(self, name):
        self.name = name

    def __str__(self):
        return self.name

    def __repr__(self):
        return f'Cat({repr(self.name)})'

cat = Cat('Fuzzy')
print(str(cat))  # Fuzzy
print(repr(cat)) # Cat('Fuzzy')
```

### Equality

Operator	Method	Description
- `==`	|  `__eq__`  |	Equal to
- `!=`	|  `__ne__`  |	Not equal to
- `<`   |  `__lt__`  |	Less than
- `<=`	|  `__le__`  |	Less than or equal to
- `>`   |  `__gt__`  |	Greater than
- `>=`	|  `__ge__`  |	Greater than or equal to



## Constructor Function

```py
class Dog(Pet)

    def __init__(self, name):
        self.name = name

```

- What happens during Object Instantiation:
    1. Constructor first calls static method `__new__`
        - `ConstructorFunction.__new__`
    2. Constructor initializes object using `__init__`

## Instance methods
    
- Must always include first parameter as `self`

```py
class GoodDog:

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def speak(self):
        return 'Arf!'

sparky = GoodDog('Sparky', 5)
print(sparky.speak())
```

## Privacy

- Prefix a method/property with `_`
    - This does not prevent changes, but shows other devs that it shouldn't be messed with

```py
class GoodDog:

    def __init__(self, name, age):
        self._name = name
        self._age = age

    def speak(self):
        return f'{self._name} says arf!'

    def _dog_years(self):
        return self._age * 7

    def show_age(self):
        print(f'My age in dog years is {self._dog_years()}')

# Omitted code
```

## Decorators

- Use `@property` to create getter methods for a property
    - Allows property getting/setting to have more functionality
    - Getter does not have to use `()` to be invoked

```py
class GoodDog:

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def speak(self):
        return f'{self.name} says arf!'

    @property
    def name(self):
        return self._name

    @name.setter
    def name(self, new_name):
        self._name = new_name

sparky = GoodDog('Sparky', 5)
sparky.name = 'Fido'  # Uses `@name.setter` method to reassign `_name`
print(sparky.name)    # Uses `name` getter method to return `_name`
```

## Class Methods

- Use `@classmethod` decorator
- Use `cls` in place of `self` for these methods

```py
class GoodCat():

    def __init__(self):
        pass

    @classmethod
    def what_am_i(cls):
        print("I'm a GoodCat class!")


GoodCat.what_am_i()

cat = GoodCat()  # Call method directly on class
cat.what_am_i()  # Possible, but should be avoided
```

## Class Variables

- Defined at top of class and are available to all instances
- Access via `ClassConstructor.class_variable`
- Affected by inheritance
- Can use Class Constants in same format, but functionality does not change

```py
class GoodCat:

    counter = 0                  # class variable

    def __init__(self):
        GoodCat.counter += 1

    @classmethod
    def number_of_cats(cls):
        return GoodCat.counter

class ReallyGoodCat(GoodCat):
    pass

cat1 = GoodCat()
cat2 = GoodCat()
cat3 = ReallyGoodCat()

print(GoodCat.number_of_cats())        # 3
print(GoodCat.counter)                 # 3
print(ReallyGoodCat.number_of_cats())  # 3
print(ReallyGoodCat.counter)           # 3
```

## Static Methods

- Provide functionality to class instance, but do not require any information and therefore do not need `self` or `cls`

```py
class TheGame:
    # Game playing code goes here

    def play(self):
        pass

    @staticmethod
    def show_rules():
        print('These are the rules of the game')
        # The rules go here.

TheGame.show_rules()

game = TheGame()
game.play()
```