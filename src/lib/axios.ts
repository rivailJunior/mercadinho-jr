import { env } from '@/config/env';
import axios from 'axios';

export const api = axios.create({
  baseURL: env.BASE_URL,
});
