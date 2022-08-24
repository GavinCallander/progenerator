import { useState } from 'react';

import useSWR from 'swr';

const fetcher = (url) => fetch(url).then(res => res.json());

export default function Index() {

  // store all generatedProjects into an array
  // this is useful in preventing duplicate suggestions as new generations can be checked against previous ones
  // with duplicates being rejected
  const [generatedProjects, setGeneratedProjects] = useState([]);
  // define currentProject for later use
  let currentProject = {...generatedProjects[generatedProjects.length-1]};

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

  const { data, error } = useSWR('/api/staticdata', fetcher);

  if (error) return <div>Failed to load</div>;

  if (!data) return <div>Loading</div>;

  return (
    <div>
      <header>
        <h1>Progenerator</h1>
        <p>Generate your next project idea now</p>
      </header>
      <main>
        <p>{currentProject.name}</p>
        <p>{currentProject.desc}</p>
        <button onClick={generateProject}>Generate</button>
      </main>
      <footer>
        <p>All rights reserved GCWebDev 2022</p>
      </footer>
    </div>
  )
};