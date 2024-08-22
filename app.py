import pygetwindow as gw

def get_all_current_apps():
    apps = []

    for window in gw.getAllWindows():
        if window.visible:
            apps.append(window.title)
    return apps


print(get_all_current_apps())