export default {};

// import classNames from 'classnames';
// import { useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import { Link } from 'react-router-dom';
// import { IPracticeCategory, Practice } from '../../common/types';
// import './result-accordion.scss';
// import { useGetPracticeCategoryQuery } from '../../Redux/services/api';
// import Spinner from '../Spinner/Spinner';

// const Accordion = () => {
//   const { data, isLoading, isSuccess, isError, error } =
//     useGetPracticeCategoryQuery();

//   const { t } = useTranslation();

//   const [toggleChildTab, settoggleChildTab] = useState(null);

//   const [tab, setTab] = useState(null);

//   const toggle = (id: any) => {
//     if (tab === id) {
//       settoggleChildTab(null);
//       return setTab(null);
//     }
//     settoggleChildTab(null);
//     return setTab(id);
//   };

//   const toggleChild = (id: any) => {
//     if (toggleChildTab === id) return settoggleChildTab(null);
//     return settoggleChildTab(id);
//   };

//   return (
//     <>
//       {isLoading && <Spinner />}
//       {isError && error}
//       {isSuccess && data && (
//         <>
//           <div className='top-title'>
//             <h4>{t('search-results-page.conservation-practices')}</h4>
//           </div>
//           <div className='accordion-section'>
//             {data.map((item: IPracticeCategory) => {
//               const chevronClassName = classNames('fas', {
//                 'fas fa-chevron-right': tab !== item.practiceCategoryId,
//                 'fas fa-chevron-down': tab === item.practiceCategoryId,
//               });
//               const accordionClass = classNames({
//                 'accordion-container': tab !== item.practiceCategoryId,
//                 'accordion-container-blue': tab === item.practiceCategoryId,
//               });
//               return (
//                 <>
//                   <div className={accordionClass}>
//                     <li key={item.practiceCategoryId}>
//                       <i
//                         className={chevronClassName}
//                         onClick={() => toggle(item.practiceCategoryId)}
//                         role='presentation'
//                       />
//                       <div className='accordion-data'>
//                         <h4>{item.practiceCategoryName}</h4>
//                         <div>
//                           {tab === item.practiceCategoryId && (
//                             <p>
//                               {'item.practiceCategoryDescription ' ||
//                                 'No description Available'}
//                             </p>
//                           )}
//                           {tab === item.practiceCategoryId && (
//                             <p>
//                               <Link to={item.practiceCategoryName}>
//                                 {item.practiceCategoryName} Details
//                               </Link>
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                     </li>
//                   </div>
//                   {tab === item.practiceCategoryId && (
//                     <div className='child-accordion-container'>
//                       {item.map((ele: Practice) => {
//                         const childChevronClassName = classNames('fas', {
//                           'fa-chevron-right': toggleChildTab !== ele.practiceId,
//                           'fa-chevron-down': toggleChildTab === ele.practiceId,
//                         });
//                         return (
//                           <li
//                             key={ele.practiceId}
//                             onClick={() => toggleChild(ele.practiceId)}
//                             role='presentation'
//                           >
//                             <i className={childChevronClassName} />
//                             <div className='child-data'>
//                               <h4>{ele.practiceName}</h4>
//                               <div>
//                                 {toggleChildTab === ele.practiceId && (
//                                   <p>
//                                     {ele.practiceDescription ||
//                                       'No description Available'}
//                                   </p>
//                                 )}
//                                 {toggleChildTab === ele.practiceId && (
//                                   <p>
//                                     <Link to={ele.practiceLink}>
//                                       {ele.practiceName} Details
//                                     </Link>
//                                   </p>
//                                 )}
//                               </div>
//                             </div>
//                           </li>
//                         );
//                       })}
//                       <hr />
//                     </div>
//                   )}
//                 </>
//               );
//             })}
//           </div>
//         </>
//       )}
//       {/* For demo Purpose */}
//       <div className='top-title'>
//         <h4>{t('search-results-page.project-initiatives')}</h4>
//       </div>
//     </>
//   );
// };

// export default Accordion;
