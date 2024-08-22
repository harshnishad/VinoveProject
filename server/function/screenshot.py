import pyautogui
import time
import datetime

def screenshot(interval: int):
    now = datetime.datetime.now()
    print(now)
    time.sleep(interval)
    # take screenshot using pyautogui
    image = pyautogui.screenshot()
    # Save the screenshot
    image.save("image1.png")
