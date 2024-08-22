from pynput import mouse, keyboard

# Define the callback functions
def on_move(x, y):
    print(f"Mouse moved to ({x}, {y})")

def on_click(x, y, button, pressed):
    if pressed:
        print(f"Mouse clicked at ({x}, {y}) with {button}")

def on_scroll(x, y, dx, dy):
    print(f"Mouse scrolled at ({x}, {y}) with delta ({dx}, {dy})")

def on_press(key):
    try:
        print(f"Key pressed: {key.char}")
    except AttributeError:
        print(f"Special key pressed: {key}")

def on_release(key):
    print(f"Key released: {key}")

# Set up the mouse listener
mouse_listener = mouse.Listener(
    on_move=on_move,
    on_click=on_click,
    on_scroll=on_scroll
)

# Set up the keyboard listener
keyboard_listener = keyboard.Listener(
    on_press=on_press,
    on_release=on_release
)

# Start both listeners
mouse_listener.start()
keyboard_listener.start()

# Join both listeners to the main thread
mouse_listener.join()
keyboard_listener.join()
