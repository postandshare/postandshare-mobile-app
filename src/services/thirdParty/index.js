import {imageGeneratorInstance} from '../AxiosInstance';

export const dalleImageGenerator = body =>
  imageGeneratorInstance.post('/texttoimage', body);
