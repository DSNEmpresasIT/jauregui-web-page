import axios from 'axios';

export interface FormDataDto {
  from: string;
  subject: string;
  message: string;
  fullName: string;
}

export const sendEmail = async(formData: FormDataDto, baseUrl: string) => {
  try {
    const Itoken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTk0NTE4MTJ9.a2hpSm5qXP52b8ejgsKW5uttbaenc2pgkZsKVRROZhM'
    const headers = { Authorization: `Bearer ${Itoken}`}

    const data = await axios({
      url: `${baseUrl}/mailer/send-email`,
      method: 'POST',
      headers,
      data: formData
    })
    
    return data.data;
  } catch (error) {
    // @ts-ignore
    console.log(error?.response?.data ?? error.message)
  }
}