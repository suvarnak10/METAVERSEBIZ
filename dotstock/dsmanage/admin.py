from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from .models import Transaction, Topic, Chatbot, Profile

class ProfileInline(admin.StackedInline):
    model = Profile
    can_delete = False
    verbose_name_plural = 'profile'

# Define a new User admin
class UserAdmin(BaseUserAdmin):
    inlines = (ProfileInline,)

admin.site.register(Transaction)
admin.site.register(Topic)
admin.site.register(Chatbot)
admin.site.unregister(User)
admin.site.register(User, UserAdmin)