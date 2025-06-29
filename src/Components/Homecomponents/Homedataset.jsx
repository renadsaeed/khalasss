import { opportunities } from "../Volanteringcomponent/Dataset";
import { Organizationsdata } from "../OrganizatonProfile/Organizationdata";
import { mergedData } from "../HelpComponent/HelpsData";
import { useEffect, useState } from "react";
const allOpportunities = Object.entries(Organizationsdata).flatMap(
  ([orgName, org]) => org.data.map((item) => ({ ...item, orgName }))
);

export const fileds = {
  volantering: [...opportunities],
  Donations: [...allOpportunities],
  Helps: [...mergedData],
};
