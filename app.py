from web.app import app
import web.handler

options = {
    'debug': True,
    'host': '0.0.0.0',
    'port': 8000,
}

if __name__ == '__main__':
    app.run(**options)
