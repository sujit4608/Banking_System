# Generated by Django 4.2.4 on 2024-11-17 13:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('useronbording', '0005_remove_otp_session_id_remove_otp_timestamp_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='userBloodGroup',
            field=models.CharField(blank=True, max_length=30),
        ),
    ]
