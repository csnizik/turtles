import ResourceConcernIntroduction from '../../components/ResourceConcernIntroduction';

const ResourceConcernCategoryContainer = ({ currentResourceConcernCategory }: any) => {
  if (!currentResourceConcernCategory) return null;
  return (
    <ResourceConcernIntroduction
      introductionParagraph={
        currentResourceConcernCategory.resourceConcernCategoryDescription
      }
      title={currentResourceConcernCategory.resourceConcernCategoryName}
    />
  );
};

export default ResourceConcernCategoryContainer;
