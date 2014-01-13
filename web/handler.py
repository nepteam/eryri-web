from web.app import app
from web.util.template import render

@app.route('/m/<path:rpath>')
def mock(rpath):
    return render('m/{}.html'.format(rpath))
