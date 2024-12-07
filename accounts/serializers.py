from django.contrib.auth.password_validation import validate_password

from rest_framework import serializers

from .models import CustomUser


class RegistrationSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password]
    )
    password2 = serializers.CharField(
        write_only=True, required=True
    )

    class Meta:
        model = CustomUser
        fields = (
            'username', 'email', 'password', 'password2',
        )

    def validate(self, attrs):
        
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Пароли не совпадают."})
        
        return attrs

    def create(self, validated_data):

        validated_data.pop('password2')
        user = CustomUser.objects.create_user(**validated_data)
        return user