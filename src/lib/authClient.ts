export const login = async (username: string, password: string) => {
    try {
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
      });
  
      const data = await response.json();
  
      if (response.ok) {
        localStorage.setItem('userToken', data.access_token);
        return { success: true, error: null };
      } else {
        console.error('Login failed:', response.status, data);
        if (response.status === 422 && Array.isArray(data.detail)) {
          // Handle validation errors
          const errorMessages = data.detail.map((error: any) => error.msg).join(', ');
          return { success: false, error: `Validation error: ${errorMessages}` };
        } else {
          return { success: false, error: data.detail || 'Login failed' };
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

export const logout = () => {
  localStorage.removeItem('userToken');
};