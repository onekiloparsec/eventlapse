from django.contrib import admin
from django.contrib.sites.admin import SiteAdmin
from django.contrib.sites.models import Site

from project.eventlapse.models import *

# Augmented Site Admin
class WebSiteAdmin(SiteAdmin):
    list_display = ("pk", "domain", "name")

admin.site.unregister(Site)
admin.site.register(Site, WebSiteAdmin)

# Register your models here.

@admin.register(Category)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ("pk", "name")

@admin.register(Article)
class ObservingSiteAdmin(admin.ModelAdmin):
    list_display = ("pk", "identifier", "title", "teaser_title", "introduction", "text", "date", "photo_url", "article_url")

