import { useEffect, useState } from 'react';

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
  let displayClass = "";
  let headerClass = "";
  let mainClass = "";
  let taglineClass = "";
  // once generatedProjects is populated, change styling to allow for information display
  if (generatedProjects.length) {
    displayClass = styles.display;
    headerClass = styles.header;
    mainClass = styles.main;
    taglineClass = styles.tagline;
  }

  // function to generate a single project from the fetched data
  const generateProject = () => {
    // if the same number of projects are in generatedProjects as are in the dataset, all options have been exhausted
    // should give a user the option to begin again or something i.e. empty generatedProjects and start from scratch
    if (generatedProjects.length === data.projects.length) {
      // do the above; will hold on actually coding as this may feed into filtering in the future
      console.log('No more projects');
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

  if (currentProject.resources) {
    resourcesLinks = currentProject.resources.map((resource, i) => {
      return (
        <a className={styles.resourceLink} href={resource.url} key={i}>{resource.name};</a>
      );
    });
  } else {
    resourcesLinks = "";
  };

  // effect hook to handle content change
  // useEffect(() => { 
  //     if (currentProject.resources) {
  //       resourcesLinks = currentProject.resources.map((resource, i) => {
  //         return (
  //           <a className={styles.resourceLink} href={resource.url} key={i}>{resource.name}</a>
  //         )
  //       })
  //     }
  //   }, []);
      
  // call the fetcher function from above and return the projects data
  const { data, error } = useSWR('/api/staticdata', fetcher);
  // error handling etc
  if (error) return <div>Failed to load</div>;

  if (!data) return <div>Loading</div>;

  return (
    <div>
      <header className={headerClass}>
        <h1>Progenerator</h1>
        <p className={taglineClass}>Generate your next project idea now</p>
      </header>
      <main className={mainClass}>
        <div className={displayClass}>
          <p>{currentProject.name}</p>
          <p>{currentProject.description}</p>
          { resourcesLinks }
        </div>
        <button onClick={generateProject}>Generate</button>
      </main>
      <footer>
        <p>All rights reserved GCWebDev 2022</p>
      </footer>
    </div>
  )
};