# Generated by Django 4.2.4 on 2024-06-20 17:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('useronbording', '0003_otp'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='isAccount',
            field=models.BooleanField(default=False, null=True),
        ),
    ]
