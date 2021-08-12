import { useTranslation } from 'react-i18next';
import CustomResourceIssue from '../CustomResourceIssue';
import './custom-resource-issue-list.scss';

// TODO: make component responsive
interface ICustomResourceBoxData {
  id: number;
  resourceName: string;
}

interface IResourceIssue {
  handleSelectResourceConcern: Function;
  id: number;
  resourceName: string;
}

const CustomResourceIssueList = () => {
  const { t } = useTranslation();
  const mockData: IResourceIssue[] = [
    {
      handleSelectResourceConcern: () => {},
      id: 1,
      resourceName: 'Soil Health',
    },
    {
      handleSelectResourceConcern: () => {},
      id: 2,
      resourceName: 'Nutrient Management',
    },
    {
      handleSelectResourceConcern: () => {},
      id: 3,
      resourceName: 'Source Water Protection',
    },
  ];

  return (
    <div className='custom-resource-container'>
      <p className='container-header'>
        {t('resource-issues.common-resource-issues')}
      </p>
      <p className='container-text'>Some well known resource issues</p>
      {mockData.map((item: ICustomResourceBoxData) => {
        return (
          <div key={item.id} className='child-box'>
            <CustomResourceIssue heading={item.resourceName} />
          </div>
        );
      })}
    </div>
  );
};

export default CustomResourceIssueList;
