import { httpGet } from './mock-http-interface';

type httpGetResponse = {
  [key: string]: string;
};

type BodyType = {
  message: string;
}

type TResult = httpGetResponse[];

export const getArnieQuotes = async (urls: string[]): Promise<TResult> => {
  let result : TResult = [];
  await Promise.all(urls.map(async item => {
    const httpGetResult = await httpGet(item);
    let httpGetResultObject: httpGetResponse = {};
    const bodyType: BodyType = JSON.parse(httpGetResult.body)
    if (httpGetResult.status === 200) {
      httpGetResultObject = { 'Arnie Quote': bodyType.message };
    }
    if (httpGetResult.status === 500) {
      httpGetResultObject = { FAILURE: bodyType.message };
    }
    result.push(httpGetResultObject);
  }));

  return result;
};
