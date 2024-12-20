# Generated by Django 4.2.4 on 2024-07-14 18:12

from django.db import migrations, models
import useronbording.models


class Migration(migrations.Migration):

    dependencies = [
        ('useronbording', '0004_user_isaccount'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='otp',
            name='session_id',
        ),
        migrations.RemoveField(
            model_name='otp',
            name='timestamp',
        ),
        migrations.AddField(
            model_name='otp',
            name='expires_at',
            field=models.DateTimeField(default=useronbording.models.default_expiry),
        ),
        migrations.AddField(
            model_name='otp',
            name='user_email',
            field=models.CharField(default='', max_length=200),
        ),
        migrations.AlterField(
            model_name='otp',
            name='otp',
            field=models.CharField(max_length=6),
        ),
    ]
