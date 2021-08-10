import React from 'react';
import { PageSection, Title } from '@patternfly/react-core';
import { Table, TableHeader, TableBody, IRowData } from '@patternfly/react-table';
import { useQuery } from '@apollo/client';
import { getSkills } from '@app/graphql/queries';
import { Loading } from '@app/components';

const SkillsManagement: React.FC = () => {
  const { data, loading } = useQuery(getSkills);

  if (loading) {
    return <Loading />;
  }

  const onSelect = () => {};

  const getRows = () => {
    const tableRow: (IRowData | string[])[] | undefined = [];
    data?.skill?.map((s) => {
      tableRow?.push({
        cells: [
          { title: s.name },
          {
            title: (
              <>
                <a href="#">Edit</a>
              </>
            ),
          },
          {
            title: (
              <>
                <a href="#">Delete</a>
              </>
            ),
          },
        ],
      });
    });
    return tableRow;
  };

  const columns = [{ title: 'Name' }];

  return (
    <PageSection>
      <Table aria-label="Bulk Select Table Demo" cells={columns} rows={getRows()}>
        <TableHeader />
        <TableBody />
      </Table>
    </PageSection>
  );
};

export { SkillsManagement };
export default SkillsManagement;
