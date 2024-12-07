from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import RegistrationSerializer


class RegistrationView(APIView):

    def post(self, request):

        serializer = RegistrationSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        
        user = request.user
        return Response({
            'username': user.username,
            'email': user.email
        })