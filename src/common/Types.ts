//build project type.
import Extent from '@arcgis/core/geometry/Extent'

export interface IProject {
  stateExtent:Extent;
  agreementNumber: string;
  awardeeName: string;
  title: string;
  funds: number;
  state: string;
  year: number;
  resource: string;
  description: string;
  deliverables: string;
}
