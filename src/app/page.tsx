"use client"

import React, { useState, useEffect } from 'react';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import data from './Arknights Module Checklist.json';

export default function App() {
  const [moduleData, setModuleData] = useState(data);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [todoFilter, setTodoFilter] = useState("to-do");

  useEffect(() => {
    const storedData = localStorage.getItem('moduleData');

    if (storedData) {
      setModuleData(JSON.parse(storedData));
    } else {
      setModuleData(data);
    }
  }, []);

  useEffect(() => {
    if (moduleData.length > 0) {
      localStorage.setItem('moduleData', JSON.stringify(moduleData));
    }
  }, [moduleData]);

  const toggleTask = (id: number, mission: string) => {
    setModuleData(prevData =>
      prevData.map(module =>
        module.id === id
          ? {
            ...module,
            [mission]: module[mission as keyof typeof module] === 1 ? 0 : 1
          }
          : module
      )
    );
  };

  const filteredData = () => {
    let filtered = moduleData;

    if (todoFilter === 'to-do') {
      filtered = filtered.filter(item => item.mission1Status === 0 || item.mission2Status === 0);
    }

    if (categoryFilter === 'vanguard') {
      filtered = filtered.filter(item => item.class === 'Vanguard');
    } else if (categoryFilter === 'guard') {
      filtered = filtered.filter(item => item.class === 'Guard');
    } else if (categoryFilter === 'defender') {
      filtered = filtered.filter(item => item.class === 'Defender');
    } else if (categoryFilter === 'sniper') {
      filtered = filtered.filter(item => item.class === 'Sniper');
    } else if (categoryFilter === 'caster') {
      filtered = filtered.filter(item => item.class === 'Caster');
    } else if (categoryFilter === 'medic') {
      filtered = filtered.filter(item => item.class === 'Medic');
    } else if (categoryFilter === 'supporter') {
      filtered = filtered.filter(item => item.class === 'Supporter');
    } else if (categoryFilter === 'specialist') {
      filtered = filtered.filter(item => item.class === 'Specialist');
    }

    if (searchTerm) {
      filtered = filtered.filter(item => {
        return (
          item.operator.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }

    return filtered;
  };

  const exportData = () => {
    const dataStr = JSON.stringify(moduleData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'moduleData.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className='bg-stone-900 min-h-screen'>
      <div className="mb-3 xl:w-96 bg-stone-900">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <input
            type="search"
            className="relative mx-4 my-4 block flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-300 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-400 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
            placeholder="Search Operator Name"
            aria-label="Search"
            aria-describedby="button-addon2"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span
            className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
            id="basic-addon2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5">
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clipRule="evenodd" />
            </svg>
          </span>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 mx-4 mb-4 bg-stone-900">
        <div onClick={() => setTodoFilter('to-do')} className={todoFilter === "to-do" ? "bg-sky-500 hover:bg-sky-600 text-neutral-100 font-bold py-2 px-4 rounded" : "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"}>To Do</div>
        <div onClick={() => setTodoFilter('all')} className={todoFilter === "all" ? "bg-sky-500 hover:bg-sky-600 text-neutral-100 font-bold py-2 px-4 rounded" : "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"}>All</div>
        <div className='border-r-2 border-r-blue-400'></div>
        <div onClick={() => setCategoryFilter('all')} className={categoryFilter === 'all' ? "bg-sky-500 hover:bg-sky-600 text-neutral-100 font-bold py-2 px-4 rounded" : "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"}>All</div>
        <div onClick={() => setCategoryFilter('vanguard')} className={categoryFilter === 'vanguard' ? "bg-sky-500 hover:bg-sky-600 text-neutral-100 font-bold py-2 px-4 rounded" : "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"}>Vanguard</div>
        <div onClick={() => setCategoryFilter('guard')} className={categoryFilter === 'guard' ? "bg-sky-500 hover:bg-sky-600 text-neutral-100 font-bold py-2 px-4 rounded" : "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"}>Guard</div>
        <div onClick={() => setCategoryFilter('defender')} className={categoryFilter === 'defender' ? "bg-sky-500 hover:bg-sky-600 text-neutral-100 font-bold py-2 px-4 rounded" : "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"}>Defender</div>
        <div onClick={() => setCategoryFilter('sniper')} className={categoryFilter === 'sniper' ? "bg-sky-500 hover:bg-sky-600 text-neutral-100 font-bold py-2 px-4 rounded" : "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"}>Sniper</div>
        <div onClick={() => setCategoryFilter('caster')} className={categoryFilter === 'caster' ? "bg-sky-500 hover:bg-sky-600 text-neutral-100 font-bold py-2 px-4 rounded" : "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"}>Caster</div>
        <div onClick={() => setCategoryFilter('medic')} className={categoryFilter === 'medic' ? "bg-sky-500 hover:bg-sky-600 text-neutral-100 font-bold py-2 px-4 rounded" : "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"}>Medic</div>
        <div onClick={() => setCategoryFilter('supporter')} className={categoryFilter === 'supporter' ? "bg-sky-500 hover:bg-sky-600 text-neutral-100 font-bold py-2 px-4 rounded" : "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"}>Supporter</div>
        <div onClick={() => setCategoryFilter('specialist')} className={categoryFilter === 'specialist' ? "bg-sky-500 hover:bg-sky-600 text-neutral-100 font-bold py-2 px-4 rounded" : "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"}>Specialist</div>
      </div>
      <div className="mx-4 mb-4">
          <button
            onClick={exportData}
            className="bg-sky-500 hover:bg-sky-600 text-neutral-100 font-bold py-2 px-4 rounded">
            Export Data
          </button>
        </div>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-stone-900">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-bold text-amber-400 uppercase tracking-wider"
                    >
                      Operator
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-bold text-amber-400 uppercase tracking-wider"
                    >
                      Module
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-bold text-amber-400 uppercase tracking-wider"
                    >
                      Mission
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-bold text-amber-400 uppercase tracking-wider"
                    >
                      Checklist
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-stone-900 divide-y divide-gray-200">
                  {filteredData().map(module => (
                    <tr key={module.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 ">
                            <div className="h-10 w-10 rounded-full bg-slate-300" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-200">{module.operator}</div>
                            <div className="text-sm text-gray-500">{module.subclass}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {module.module}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-400">{module.mission1}</div>
                        <div className="text-sm text-gray-400">{module.mission2}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div onClick={() => toggleTask(module.id, 'mission1Status')}>
                          {module.mission1Status == 1 ? <CheckBoxIcon className="text-gray-400"/> : <CheckBoxOutlineBlankIcon className="text-gray-400"/>}
                        </div>
                        <div onClick={() => toggleTask(module.id, 'mission2Status')}>
                          {module.mission2Status == 1 ? <CheckBoxIcon className="text-gray-400"/> : <CheckBoxOutlineBlankIcon className="text-gray-400"/>}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}