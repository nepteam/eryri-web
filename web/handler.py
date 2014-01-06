from flask import render_template as render
from web.app import app

@app.route('/m/<path:rpath>')
def mock(rpath):
    print(rpath)
    return render('m/{}.html'.format(rpath))
