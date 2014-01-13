import re
from flask import render_template, url_for
from web.app import app

_rec_external_resource_path = re.compile('^(https?:)?//')

def render(path, **contexts):
    return render_template(path, **contexts)

@app.context_processor
def rendering_utilities():
    def import_css(*resource_paths):
        output = []

        for resource_path in resource_paths:
            output.append('<link rel="stylesheet" href="{}"/>'.format(
                resource_path\
                    if _rec_external_resource_path.search(resource_path)\
                    else url_for('static', filename=resource_path)
            ))

        return ''.join(output)

    def import_js(*resource_paths):
        output = []

        for resource_path in resource_paths:
            output.append('<script src="{}"/></script>'.format(
                resource_path\
                    if _rec_external_resource_path.search(resource_path)\
                    else url_for('static', filename=resource_path)
            ))

        return ''.join(output)

    return dict(
        _css=import_css,
        _js=import_js
    )