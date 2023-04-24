import axios from 'axios';

describe('GET /version', () => {
  it('should return a version', async () => {
    const res = await axios.get(`/version`);

    expect(res.status).toBe(200);
    expect(res.data).toEqual({ version: '0.0.1' });
  });
});
