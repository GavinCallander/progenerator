import { useState } from 'react';

import useSWR from 'swr';

import styles from './Pages.module.scss';

const fetcher = (url) => fetch(url).then(res => res.json());

export default function Index() {

  // store all generatedProjects into an array
  // this is useful in preventing duplicate suggestions as new generations can be checked against previous ones
  // with duplicates being rejected
  const [generatedProjects, setGeneratedProjects] = useState([]);

  // define non-state variables
  let currentProject = {...generatedProjects[generatedProjects.length-1]};
  let resourcesLinks;

  // function to generate a single project from the fetched data
  const generateProject = () => {
    // if the same number of projects are in generatedProjects as are in the dataset, all options have been exhausted
    // should give a user the option to begin again or something i.e. empty generatedProjects and start from scratch
    if (generatedProjects.length === data.projects.length) {
      // do the above; will hold on actually coding as this may feed into filtering in the future
      return;
    }
    // if this is not the case, we can randomly choose a project
    else {
      // Generate a random number between 0 and projects.length - 1
      let index = Math.floor(Math.random() * data.projects.length);
      // check data.projects.id against state to see if we have a duplicate
      // if yes, run the function again
      if (generatedProjects.includes(data.projects[index])) {
        generateProject();
      }
      // otherwise add to the array and return
      else {
        setGeneratedProjects([...generatedProjects, data.projects[index]]);
        return;
      };
    };
  };
  
  // conditionally render links for any resources associated with a given project
  if (currentProject.resources) {
    resourcesLinks = currentProject.resources.map((resource, i) => {
      return (
        <a className={styles.resourceLink} href={resource.url} key={i} rel="noreferrer" target="_blank">{resource.name}</a>
      );
    });
  } else {
    resourcesLinks = "";
  };

  // call the fetcher function from above and return the projects data
  const { data, error } = useSWR('/api/staticdata', fetcher);
  // error handling etc
  if (error) return <div>Failed to load</div>;

  if (!data) return <div>Loading</div>;

  return (
    <div>
      <header>
        <h1>Progenerator</h1>
      </header>
      <main>
        <div>
          <h3>{currentProject.name}</h3>
          <p>{currentProject.description}</p>
          <div className={styles.linksBox}>
            { resourcesLinks }
          </div>
        </div>
        <div>
          <p>Generate your next project now</p>
          <button onClick={generateProject}>Generate</button>
        </div>
      </main>
      <footer>
        <p>All rights reserved GCWebDev 2022</p>
      </footer>
    </div>
  )
};