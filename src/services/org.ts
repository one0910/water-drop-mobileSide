import { GET_ORG } from '@/graphql/org';
import { TOrgQuery } from '@/utils/types';
import { useQuery } from '@apollo/client';

export const useOrganization = (id: string) => {
  const { loading, data } = useQuery<TOrgQuery>(GET_ORG, {
    variables: {
      id,
    },
  });

  return {
    loading,
    data: data?.getOrganizationInfo.data,
  };
};
