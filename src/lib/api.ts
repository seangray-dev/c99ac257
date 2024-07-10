const BASE_URL = 'https://aircall-backend.onrender.com';

export const fetchCalls = async () => {
  try {
    const res = await fetch(`${BASE_URL}/activities`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching activities:', error);
    throw error;
  }
};

export const getCallDetails = async (callId: number) => {
  try {
    const response = await fetch(`${BASE_URL}/activities/${callId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching call details for ID ${callId}:`, error);
    throw error;
  }
};

export const updateCall = async ({
  callId,
  isArchived,
}: {
  callId: string;
  isArchived?: boolean;
}) => {
  try {
    const res = await fetch(`${BASE_URL}/activities/${callId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ is_archived: isArchived }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Error updating call ID ${callId}: ${text}`);
    }

    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return res.json();
    } else {
      const text = await res.text();
      return { message: text };
    }
  } catch (error) {
    console.error(`Error updating call ID ${callId}:`, error);
    throw error;
  }
};

export const resetCalls = async () => {
  try {
    const response = await fetch(`${BASE_URL}/reset`, {
      method: 'PATCH',
    });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(text);
    }
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    } else {
      const text = await response.text();
      return { message: text };
    }
  } catch (error) {
    console.error('Error resetting calls:', error);
    throw error;
  }
};
