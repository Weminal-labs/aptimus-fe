export type ApplicationResponse = {
  applicationId: string;
};

export async function loader({ params }: { params: any }) {
  const applicationId = params.appId;
  return { applicationId } as ApplicationResponse;
}
