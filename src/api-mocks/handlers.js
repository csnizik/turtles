import { rest } from 'msw';
import { baseURL } from '../common/util/AxiosUtil';

const postLandscapeInitiatives = `${baseURL}/landscapeInitiatives`;
const postProjectSearchData = `${baseURL}/project/projectSearch`;

const projHandler = rest.post(postProjectSearchData, async (req, res, ctx) => {
  console.log(req.body);
  res(
    ctx.json([
      {
        projectId: 71,
        projectTitle:
          'A New Technology for Threatened and Endangered Species Monitoring in the San Luis Valley of Colorado: Remote, Passive, Acoustic Monitoring for Southwestern Willow Flycatcher, Yellow-billed Cuckoo, and Northern Leopard Frogs',
        projectDescription:
          'Traditional bird or amphibian surveys typically require one or more observers in the field to document birds by sight or vocalization. A number of factors associated with different methods can result in negative impact to a species and poor monitoring results. With acoustic monitoring a species can be monitored for days or weeks with disturbance limited to brief visits to the site to set up and retrieve the recordings. The data are collected at all sites in the same way removing all observer bias or influences of inclement weather. The potential bias associated with data analysis is eliminated because recordings are scanned on a computer with the same recognizer. This technology has proven to be extremely effective for determination of presence or absence of specific wildlife species (bats and marine mammals) without the intrusion or influence of humans in the area. This project will utilize the technology of acoustic monitoring by developing, testing and refining recognizers to improve monitoring of threatened and endangered species in the San Luis Valley. Acoustic monitors will be deployed to detect breeding populations, focus Habitat improvement measures and measure success of treatments by the presence or absence of these species in locations that have baseline conditions documented through matching funds.',
        projectOwner: 'Wetland Dynamics, LLC',
        projectLink: null,
        statesInvolved: ['CO'],
        awardeeYear: 2014,
      },
      {
        projectId: 61,
        projectTitle:
          'Demonstrate the potential of cover crop and forage mixtures to improve soil quality',
        projectDescription:
          'The purpose of this project is to demonstrate and quantify the impacts of soil-health improving management practices including Cover Crops, crop rotations, and reduced tillage on a range of soil properties and processes – including nutrient cycling and soil water availability in the semi-arid environments of the western Great Plains. On- farm demonstration sites and comparison studies will be established in eastern Colorado, western Kansas and western Nebraska to show farmers how these management practices can be successfully adopted in these environments.',
        projectOwner: 'Colorado State University',
        projectLink: null,
        statesInvolved: ['CO'],
        awardeeYear: 2015,
      },
      {
        projectId: 67,
        projectTitle:
          'Expanding and Testing the Utility of Land Potential Knowledge System (LandPKS) – an Open Source Grazing Land Evaluation Tool for Ranchers',
        projectDescription:
          'To survive in an increasingly challenging management environment, ranchers often rely on technical assistance. Access to comprehensive information about land potential enhances adaptive management, and having tools for easy, meaningful monitoring is critical. By using the free, open source Land-Potential Knowledge System(LandPKS) mobile app, ranchers can rapidly identify soils, and inventory and monitor vegetation for use in management decisions. This existing tool provides much of the needed information for ranchers to make appropriate management decisions, but additional information about livestock forage utilization and wildlife Habitat potential other resource values (e.g., grassland bird management) is needed to improve the utility of this tool. Although used internationally, LandPKS has yet to be tested with US ranchers.',
        projectOwner: 'The Nature Conservancy of Colorado',
        projectLink: null,
        statesInvolved: ['CO'],
        awardeeYear: 2018,
      },
      {
        projectId: 62,
        projectTitle:
          'FARMS: Farmers for Advancing Regenerative Management Systems',
        projectDescription:
          ' Soil health is rarely achieved through isolated methods, but rather through a producer’s integration and adaptation of a suite of practices to his/her local context. It is this systems-based and context-dependent approach to soil health, in concert with social support, that can transcend the limitations of isolated conservation practices and decision making. To increase the adoption of soil health management systems in the High Plains, we will demonstrate that producers can implement these systems profitably. An emphasis on applying principle-based systems rather than specific practices will permit us to work with a diverse cohort of 6 long-term practitioners of soil health and 18 transitioning producers representing both dryland and irrigated operations. Producers will receive financial support to create Comprehensive Soil Health Management Plans and implement a suite of practices well-suited for their operation. FARMS: Farmers for Advancing Regenerative Management Systems will provide qualified technical assistance, facilitate peer working groups, and leverage the expertise of long-term practitioners to mentor transitioning producers. This innovative combination of technical and social support will equip participants to sustain these soil health systems and regenerate their land for future generations.',
        projectOwner: 'Colorado Conservation Tillage Association',
        projectLink:
          'https://cig.sc.egov.usda.gov/projects/farms-farmers-advancing-regenerative-management-systems',
        statesInvolved: ['CO'],
        awardeeYear: 2019,
      },
      {
        projectId: 70,
        projectTitle:
          'Implementation of a Multi-Species Weed Biological Control Program on Ute Mountain and Southern Ute Tribal Lands',
        projectDescription:
          'Classical weed biological control has been shown to be an effective, safe and inexpensive method for the control of exotic, invasive weeds. The Colorado Department of Agriculture Insectary has been at the forefront of a number of weed biological control projects. The Insectary currently has in culture, or in field insectaries, 24 arthropods used in weed biocontrol. Among our target weeds are several species that are widespread and can have severe economic and environmental impacts. Proven and effective biocontrol agents for control of these weeds are available at the Insectary. A major challenge is to get the control agents out to the areas where they are needed and to monitor weed infestations to assure establishment of the agents and actual control of the weeds. The purpose of this project is to use biocontrol to manage multi-species weed invasions on a large tract of tribal land. The project will execute a novel multi-species control plan using proven biocontrol technology. The outcome of this effort will be a template for future programs that target a number of weed pest species and bring together agencies and groups to control weeds on private and public lands.',
        projectOwner: 'Colorado Department of Agriculture',
        projectLink: null,
        statesInvolved: ['CO'],
        awardeeYear: 2005,
      },
      {
        projectId: 68,
        projectTitle:
          'Informing Habitat enhancement and fence-marking projects to increase Greater Sage-grouse and other sagebrush obligate bird populations',
        projectDescription:
          'The project goal is to develop a Decision Support Tool. Decision support systems are important tools in the adaptive management process due to the uncertain nature of managing natural resources. The tool will raise awareness for sagebrush obligate birds and determine most cost-effective fence markers.',
        projectOwner: 'Rocky Mountain Bird Observatory',
        projectLink: null,
        statesInvolved: ['CO'],
        awardeeYear: 2012,
      },
      {
        projectId: 60,
        projectTitle:
          'Learning from the land: Extending state-and-transition models for adaptive management of western rangelands',
        projectDescription:
          'The purpose of this project is to streamline, test and evaluate the participatory development of state-and- transition models (STMs) that incorporate sage-grouse Habitat conditions. This project will demonstrate their utility for adaptive management of sage-grouse Habitat and livestock production, and thereby to increase awareness and adoption of STMs by ranchers while contributing to NRCS objectives of revising ecological site descriptions and promoting adaptive management and monitoring of sage-grouse Habitat through the Sage-grouse Initiative.',
        projectOwner: 'Colorado State University',
        projectLink: null,
        statesInvolved: ['CO'],
        awardeeYear: 2012,
      },
      {
        projectId: 73,
        projectTitle:
          'Maturing Western environmental markets through the application of innovative environmental impact investment mechanisms',
        projectDescription:
          'With partners including Colorado Cattlemen’s Association and the states of Nevada and Utah, this project aims to develop a pay-for-success investment instrument for wildlife Habitat and water quality conservation. The state of Nevada will pilot the instrument as part of its efforts to conserve greater sage-grouse Habitat.',
        projectOwner: 'Partners for Western Conservation',
        projectLink: null,
        statesInvolved: ['CO'],
        awardeeYear: 2015,
      },
      {
        projectId: 72,
        projectTitle:
          'Next Generation Technology for Monitoring Edge-of-Field Water Quality in Organic Agriculture',
        projectDescription:
          '1) Design, demonstrate, and document a novel, low-cost, automatic water sampler for edge-of-field monitoring, 2) Deploy and demonstrate the new technology at multiple locations at a large organic dairy operation in Colorado, 3) Demonstrate a simplified method for measuring soil infiltration, 4) Assess conservation/regenerative practices on soil health and runoff, and 5) Transfer the technology and techniques to stakeholders.',
        projectOwner: 'Colorado State University',
        projectLink: null,
        statesInvolved: ['CO'],
        awardeeYear: 2018,
      },
      {
        projectId: 69,
        projectTitle:
          'Site Specific Nitrogen Management in an Intensified No-Till Dryland Cropping System',
        projectDescription:
          'Traditional methods of applying nitrogen uniformly to crop fields are inefficient and can have significant environmental impacts through soil acidification, toxin accumulation, and ground and surface water contamination. The purpose of this project is to establish a regional demonstration project for electrical conductivity (EC) zone-based site-specific nitrogen management to improve productivity in an intensified no-till dryland cropping system while integrating economic and ecological aspects of nitrogen management.',
        projectOwner: 'Cinthia Johnson',
        projectLink: null,
        statesInvolved: ['CO'],
        awardeeYear: 2004,
      },
      {
        projectId: 59,
        projectTitle:
          'The Perennial Fund: Combining Innovative Finance with Carbon Farm Planning and Training to Scale Conservation with Organic Crop and Carbon Markets',
        projectDescription:
          'This project is designed to accelerate the adoption of regenerative and organic agriculture using an innovative financing vehicle, the Perennial Fund, to found Carbon Farm Plans that empower producers to access organic crops and carbon markets. Carbon Farm Planning, which builds on NRCS Conservation Planning, is a new and powerful framework for designing agricultural systems that recognize soil health as the foundation on which all agriculture depends. This project uses Carbon Farm Planning to activate financing and markets toward long-term investments in soil health and resource conservation. There are four primary activities: Carbon Farm Planning and agronomy; Carbon Farm Curriculum and Training; Perennial Fund Creation; and Crop and Carbon Market Development.',
        projectOwner: 'MAD Agriculture',
        projectLink:
          'https://cig.sc.egov.usda.gov/projects/perennial-fund-combining-innovative-finance-carbon-farm-planning-and-training-scale',
        statesInvolved: ['MT', 'NE'],
        awardeeYear: 2019,
      },
    ])
  );
});

const initHandler = rest.post(postLandscapeInitiatives, async (req, res, ctx) =>
  res(
    ctx.json([
      {
        lci_id: 2,
        lci_name: 'Joint Chiefs Landscape Restoration Partnership',
        lci_resource: '',
        lci_image_link: 'jclrp.map',
        lci_page_link:
          'https://www.nrcs.usda.gov/wps/portal/nrcs/detail/national/programs/initiatives/?cid=stelprdb1244394',
        lci_page_link_text:
          'Go to the Joint Chiefs Landscape Restoration Partnership page for detailed information',
        lci_description: [
          'Under the Joint Chiefs’ Landscape Restoration Partnership (JCLRP), NRCS and the U.S. Forest Service are working together to target conservation and restoration to measurably improve the health and resiliency of forest ecosystems where public and private lands meet to provide for long-term natural resources and production benefits. Priorities for the effort are:\r',
          ' • Reducing and mitigating wildfire threats to communities and landowners. \r',
          ' • Protecting water quality and supply for communities and industry. \r',
          ' • Improving habitat conditions for at-risk species.\r',
          '',
        ],
        lci_parent_id: null,
      },
      {
        lci_id: 7,
        lci_name: 'National Water Quality Initiative',
        lci_resource: '',
        lci_image_link: 'jclrp.map',
        lci_page_link:
          'https://www.nrcs.usda.gov/wps/portal/nrcs/detail/national/programs/initiatives/?cid=stelprdb1047761',
        lci_page_link_text:
          'Go to the National Water Quality Initiative page for detailed information',
        lci_description: [
          'The purpose of NWQI is to work with producers and landowners to implement voluntary conservation practices as part of areawide efforts to improve water quality in high-priority areas. These areas are defined primarily by subwatersheds (HUC 12) and referred to in this guidance generally as NWQI watersheds.  NWQI is designed to help individual agricultural producers take actions to reduce the runoff of sediment, nutrients, and pathogens into surface waters where water quality is a critical concern. Practice implementation is focused to identified areas of the watershed most in need of treatment. NWQI also assists with practice implementation on priority source water protection areas (SWPAs), where the drinking water source is surface or ground water. In this case, NWQI addresses identified threats to drinking water, either to remediate impairments or protect clean sources.\r',
          'NWQI is governed by a board of directors chaired by a regional conservationist (RC) and composed of select States from each Region. All NWQI guidance and instructions are reviewed by the board, assisted by the initiative coordinator.\r',
          '',
        ],
        lci_parent_id: null,
      },
      {
        lci_id: 9,
        lci_name: 'WaterSMART',
        lci_resource: '821a9b7fe7d44d92bb0ce60c0d5bcb8b',
        lci_image_link: 'jclrp.map',
        lci_page_link:
          'https://www.nrcs.usda.gov/wps/portal/nrcs/detailfull/national/programs/financial/eqip/?cid=nrcseprd1685421',
        lci_page_link_text:
          'Go to the WaterSMART page for detailed information',
        lci_description: [
          'The purpose of WSI is to assist producers and landowners in implementing voluntary conservation that is complimentary to the water conservation assistance provided through the Department of Interior’s Bureau of Reclamation (Reclamation) Sustain and Manage America’s Resources for Tomorrow (WaterSMART) program. Where Reclamation supports water conservation planning and improvement projects by States, tribes, local governments, irrigation water companies, and other organizations, NRCS targets assistance to agricultural producers to improve water conservation and irrigation water use efficiency on their operation.\r',
          'Priorities for the joint effort are—\r',
          '    • Improving irrigation water use efficiency\r',
          '    • Preventing groundwater depletion\r',
          '    • Preventing surface water depletion\r',
          '    • Optimal use of naturally available moisture and prevention of drought stress',
        ],
        lci_parent_id: null,
      },
      {
        lci_id: 10,
        lci_name: 'Working Lands for Wildlife',
        lci_resource: '821a9b7fe7d44d92bb0ce60c0d5bcb8b',
        lci_image_link: 'wlfw.map',
        lci_page_link:
          'https://www.nrcs.usda.gov/wps/portal/nrcs/detail/national/plantsanimals/fishwildlife/?cid=stelprdb1046975',
        lci_page_link_text:
          'Go to the Working Lands for Wildlife page for detailed information',
        lci_description: [
          'The WLFW initiative is a partnership with the U.S. Fish and Wildlife Service (FWS) that targets conservation efforts to improve agricultural and forest productivity and enhance wildlife habitat. Nine species are used as barometers of success because their habitat needs are representative of healthy, functioning ecosystems where conservation efforts benefit a much broader suite of species. NRCS provides technical and financial assistance to participants who voluntarily make improvements to working lands.\r',
          'In the event any of the species are listed, the FWS is committed to validating the conference reports and opinions (linked below) as biological opinions for NRCS under section 7 of the Endangered Species Act (ESA), and exempting any incidental take as described in the biological opinions associated with implementing the specified conservation practices. As a result, the participants will know that the conservation practices will continue to benefit wildlife for as long as they are implemented, and that any ESA issues associated with their implementation have been already addressed in full. Thus, FWS provides regulatory predictability relative to the ESA such that no matter what the legal status of a species, participants may have the peace of mind to keep their working lands working with NRCS conservation systems in place.',
        ],
        lci_parent_id: null,
      },
      {
        lci_id: 11,
        lci_name: 'Golden-Winged Warbler',
        lci_resource: '',
        lci_image_link: 'goldenwingedwarbler.map',
        lci_page_link:
          'https://www.nrcs.usda.gov/wps/portal/nrcs/detail/national/plantsanimals/fishwildlife/?cid=stelprdb1046990',
        lci_page_link_text:
          'Go to the Golden-Winged Warbler page for detailed information',
        lci_description: [
          'The golden-winged warbler is a nationally identified target species of the Working Lands for Wildlife (WLFW) partnership, a collaborative approach to conserve habitat on working lands. From 2012 to 2016, WLFW enabled producers to conserve or create more than 13,000 acres of early successional habitat through the implementation of science-based habitat guidelines developed especially for the golden-winged warbler. By the end of 2021, the agency aims to help landowners manage for an additional 15,000 acres of habitat.\r',
          'WLFW provides technical and financial assistance through the Environmental Quality Incentives Program, which is funded through the Farm Bill, the largest funding source for wildlife habitat conservation on private lands. Habitat restored for the golden-winged warbler benefits many other species, including songbirds like indigo bunting, gray catbird and prairie warbler as well as game species like American woodcock, cottontail, wild turkey, deer and grouse.',
        ],
        lci_parent_id: 10,
      },
      {
        lci_id: 12,
        lci_name: 'Gopher Tortoise',
        lci_resource: '',
        lci_image_link: 'gophertortoise.map',
        lci_page_link:
          'https://www.nrcs.usda.gov/wps/portal/nrcs/detail/national/plantsanimals/fishwildlife/?cid=stelprdb1047006',
        lci_page_link_text:
          'Go to the Gopher Tortoise page for detailed information',
        lci_description: [
          'The gopher tortoise is a nationally identified target species of the Working Lands for Wildlife (WLFW) partnership, a collaborative approach to conserve habitat on working lands. Since 2012, WLFW has enabled producers to conserve or create more than 278,000 acres of longleaf pine forests. WLFW provides technical and financial assistance through the Environmental Quality Incentives Program, which is funded through the Farm Bill, the largest funding source for wildlife habitat conservation on private lands. Additionally, NRCS is working to restore longleaf pine across its historic range -- from Texas to Virginia – through the Longleaf Pine Initiative. Since 2010, more than 278,000 acres of forests have been restored or enhanced.\r',
          ' Habitat restored for the gopher tortoise benefits many other species, including red cockaded woodpecker, black pine snake, bobwhite quail, white-tailed deer, turkey and dusky gopher frog. In total, 28 threatened and endangered species are dependent on longleaf pine forests.',
        ],
        lci_parent_id: 10,
      },
      {
        lci_id: 13,
        lci_name: 'Lesser Prairie-Chicken',
        lci_resource: '',
        lci_image_link: 'lesserprairiechicken.map',
        lci_page_link:
          'https://www.nrcs.usda.gov/wps/portal/nrcs/detail/national/plantsanimals/fishwildlife/?cid=stelprdb1047028',
        lci_page_link_text:
          'Go to the Lesser Prairie-Chicken page for detailed information',
        lci_description: [
          'The lesser prairie-chicken is a nationally identified target species of the Working Lands for Wildlife (WLFW) partnership, a collaborative approach to conserve habitat while keeping working lands working. From 2010 to 2015, the Lesser Prairie-Chicken Initiative (part of the WLFW family) enabled producers to conserve more than 1 million acres of prime habitat. From 2016 to 2018, NRCS aims to conserve 500,000 additional acres.\r',
          ' Through WLFW, NRCS targets conservation efforts where the returns are highest by targeting threats to the bird. For the lesser prairie-chicken, the loss and fragmentation of habitat is caused by invading mesquite and redcedars, poor grassland and prairie health and conversion to cropland. WLFW is able to provide technical and financial assistance through the Environmental Quality Incentives Program and Agricultural Conservation Easement Program, two programs funded through the Farm Bill.',
        ],
        lci_parent_id: 10,
      },
      {
        lci_id: 14,
        lci_name: 'Monarch Butterfly',
        lci_resource: '',
        lci_image_link: 'monarchbutterfly.map',
        lci_page_link:
          'https://www.nrcs.usda.gov/wps/portal/nrcs/detail/national/plantsanimals/pollinate/?cid=nrcseprd402207',
        lci_page_link_text:
          'Go to the Monarch Butterfly page for detailed information',
        lci_description: [
          'The monarch butterfly is one of the most iconic butterflies in North America and is known in part for its annual multi-generational migration from overwintering sites in central Mexico and coastal California to as far north as Canada. Multiple critical population stressors including the loss and degradation of habitat across the species range have led to a significant decrease in the number of monarchs in the U.S. over the past few decades.',
        ],
        lci_parent_id: 10,
      },
      {
        lci_id: 15,
        lci_name: 'Southwestern Willow Flycatcher',
        lci_resource: '',
        lci_image_link: 'swwillowflycatcher.map',
        lci_page_link:
          'https://www.nrcs.usda.gov/wps/portal/nrcs/detail/national/plantsanimals/fishwildlife/?cid=stelprdb1047041',
        lci_page_link_text:
          'Go to the Southwestern Willow Flycatcher page for detailed information',
        lci_description: [
          'The southwestern willow flycatcher is a nationally identified target species of the Working Lands for Wildlife (WLFW) partnership, a collaborative approach to conserve habitat on working lands. Since 2012, WLFW enabled producers to conserve or create more than 8,000 acres of riparian areas and adjacent upland habitat. WLFW provides technical and financial assistance through the Environmental Quality Incentives Program, which is funded through the Farm Bill, the largest funding source for wildlife habitat conservation on private lands.\r',
          ' Through WLFW, NRCS targets conservation efforts where the returns are highest by targeting threats to the bird. The flycatcher nests in native trees and shrubs where available but also nests in thickets dominated by the non-native invasive species like tamarisk and Russian olive. Efforts to control non-native species can be detrimental to flycatchers, especially if those plants are removed in places lacking in suitable native riparian habitat.',
        ],
        lci_parent_id: 10,
      },
      {
        lci_id: 16,
        lci_name: 'Sage Grouse',
        lci_resource: '',
        lci_image_link: 'sagegrouse.map',
        lci_page_link:
          'https://www.nrcs.usda.gov/wps/portal/nrcs/detailfull/national/plantsanimals/fishwildlife/?cid=steldevb1027671',
        lci_page_link_text:
          'Go to the Sage Grouse page for detailed information',
        lci_description: [
          'NRCS launched the Sage Grouse Initiative (SGI) in 2010 as a highly targeted and science-based landscape approach to proactively conserve sage-grouse and sustain the working rangelands that support western ranching economies. This innovative partnership of ranchers, agencies, universities, non-profit groups and businesses all embrace a common vision – achieving wildlife conservation through sustainable ranching.',
        ],
        lci_parent_id: 10,
      },
    ])
  )
);

initHandler.start({
  onUnhandledRequest: 'warn',
});

export const handlers = [initHandler, projHandler];
