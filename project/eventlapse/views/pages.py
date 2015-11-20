from django.conf import settings
from django.shortcuts import render, render_to_response
from django.views.decorators.csrf import ensure_csrf_cookie
from django.template import RequestContext
from django.views.generic.base import TemplateView
from django.utils.decorators import method_decorator

class IndexView(TemplateView):
    template_name = 'eventlapse/index.html'

    def get_context_data(self, **kwargs):
        context = super(IndexView, self).get_context_data(**kwargs)
        context["title"] = "eventlapse"
        context['angular_app'] = "webapp"
        return context

    # @method_decorator(ensure_csrf_cookie)
    # def dispatch(self, *args, **kwargs):
    #     return super(IndexView, self).dispatch(*args, **kwargs)


