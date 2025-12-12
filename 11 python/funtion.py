

# def say_hello():
#     print("hello function")
#     print("function create")


# print("no function")


# say_hello()

def star_pattern():
    for x in range(1, 6):
        for y in range(1, x + 1):
            print("$", end="")
        print("")   # <-- new line after each row


star_pattern()
