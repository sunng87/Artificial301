import httplib, urlparse, urllib, os
import base64
from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
from google.appengine.ext.webapp import template

_error_template_path = path = os.path.join(os.path.dirname(__file__), 'error.html')

class AppProxy(webapp.RequestHandler):
    """docstring for AppProxy"""

    def get(self):
        """docstring for get"""
        url  = self.request.get('r')
        if url is None:
            self.response.out.write(template.render(_error_template_path, dict(msg='400 Bad Request')))
            return 
        try:
            url = base64.b64decode(urllib.unquote(url))
            if self.request.get('a', None) is not None:
                l = list(url)
                l.reverse()
                url = ''.join(l)
        except:
            self.response.out.write(template.render(_error_template_path, dict(msg='400 Bad Request')))
            return 

        urlcomps = urlparse.urlparse(url)

        try:
            c = httplib.HTTPConnection(urlcomps.netloc)
            c.request("GET", url)
            s = c.getresponse()

            if s.status == 301 :
                l = s.getheader('location')
                self.redirect(l)
            elif s.status == 200:
                self.redirect(url)
            else:
                template_data = {'msg': 'Remote server returned HTTP'+str(s.status)}
                self.response.out.write(template.render(_error_template_path, template_data))
        except:
            template_data = {'msg': 'Failed to connect to remote server.'}
            self.response.out.write(template.render(_error_template_path, template_data))
            return 

application = webapp.WSGIApplication([('/s', AppProxy)])

def main():
    run_wsgi_app(application)

if __name__ == '__main__':
    main()

