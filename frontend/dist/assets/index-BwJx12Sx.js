(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`http://localhost:3000/tasks/`,t=async()=>await(await fetch(e)).json(),n=async(t,n)=>{let r={method:`PATCH`,body:JSON.stringify({status:n}),headers:{"Content-type":`application/json; charset=UTF-8`}},i=await fetch(e+t+`/status`,r);if(!i.ok)throw Error(`Could not update Status`);return await i.json()},r=async(t,n,r)=>{let i={method:`PATCH`,body:JSON.stringify({status:n,person:r}),headers:{"Content-type":`application/json; charset=UTF-8`}},a=await fetch(e+t+`/assign`,i);if(!a.ok)throw Error(`Could not update Status`);return await a.json()},i=async(t,n,r,i,a,o,s)=>{let c={method:`PATCH`,body:JSON.stringify({title:n,project:r,description:i,deadline:a,status:o,category:s}),headers:{"Content-type":`application/json; charset=UTF-8`}},l=await fetch(e+t+`/edit`,c);if(!l.ok){let e=await l.json();throw console.log(`BACKEND ERROR:`,e),Error(`Could not update`)}return await l.json()},a=async(t,n,r,i,a)=>{let o={method:`POST`,body:JSON.stringify({title:t,project:n,description:r,deadline:i,category:a}),headers:{"Content-type":`application/json; charset=UTF-8`}},s=await fetch(e,o);if(!s.ok)throw Error(`Could not create new task`);return await s.json()},o=async t=>{let n=await fetch(e+t,{method:`DELETE`});if(!n.ok)throw Error(`Could not delete task`);return await n.json()},s=()=>{document.querySelectorAll(`.card`).forEach(e=>{e.remove()})},c=e=>{switch(e.status){case`new`:return`
                    <p>Role: ${e.category}</p>
                    <p>Project: ${e.project}</p>
                    <p>Deadline: ${e.deadline}</p>
                    <p>Description: ${e.description}</p>
                    <button class='move fromNew'> > </button>
                    <button class='edit'>&#9998;</button>
               `;case`doing`:return`
                    <p>Role: ${e.category}</p>
                    <p>Project: ${e.project}</p>
                    <p>Deadline: ${e.deadline}</p>
                    <p>Description: ${e.description}</p>
                    <button class='move toNew'> < </button>
                    <button class='move toDone'> > </button> 
               `;case`done`:return`
                    <p>Role: ${e.category}</p>
                    <p>Project: ${e.project}</p>
                    <p>Deadline: ${e.deadline}</p>
                    <p>Description: ${e.description}</p>
               `;default:return``}},l=async()=>{s(),d(await t())},u=()=>{let e=document.querySelector(`.editContainer`);document.querySelector(`.createNew`)?.addEventListener(`click`,()=>{let t=document.createElement(`form`);e&&(e.innerHTML=``,t.innerHTML=`
                              <h2 class="editTitel">Fill all boxes to create new task: </h2>
                              <label for="titel">Titel:</label>
                              <input type="text" id="titel" name="titel" >

                              <label for="pName">Project name:</label>
                              <input type="text" id="pName" name="pName">

                              <label for="description">Description:</label>
                              <input type="text" id="description" name="description">

                              <label for="deadline">Deadline:</label>
                              <input
                                   type="datetime-local"
                                   id="deadline"
                                   name="deadline"
                                   value="2026-06-12T19:30" 
                              />

                              <label for="category">Role:</label>
                              <select id="category" name="category">
                                   <option value="ux">UX</option>
                                   <option value="frontend">Frontend</option>
                                   <option value="backend">Backend</option>
                              </select>

                              <input class="Savebtn" type="submit" value="Save">
                         `,e?.append(t),t.addEventListener(`submit`,async e=>{e.preventDefault(),e.stopPropagation();let n=t.querySelector(`#titel`).value,r=t.querySelector(`#pName`).value,i=t.querySelector(`#description`).value,o=t.querySelector(`#deadline`).value,s=t.querySelector(`#category`).value,c=await a(n,r,i,o,s);t.reset(),alert(c.message),await l()}))})},d=e=>{e.forEach(e=>{let t=document.createElement(`div`);t.classList=`card`,t.innerHTML=`
               <h3>${e.title}</h3>
               <p>Assigned to: ${e.person}</p>
          `,document.querySelector(`.${e.status}-column`)?.append(t);let a=document.createElement(`div`);if(a.classList=`extraInfo`,t.addEventListener(`click`,()=>{let o=t.querySelector(`.extraInfo`);o?o.remove():(a.innerHTML=c(e),a.querySelector(`.fromNew`)?.addEventListener(`click`,async t=>{t.stopPropagation();let n=prompt(`Assign this task to:`);n&&(await r(e.id,`doing`,n),await l())}),a.querySelector(`.toNew`)?.addEventListener(`click`,async t=>{t.stopPropagation(),await n(e.id,`new`),await l()}),a.querySelector(`.toDone`)?.addEventListener(`click`,async t=>{t.stopPropagation(),await n(e.id,`done`),await l()}),a.querySelector(`.toDoing`)?.addEventListener(`click`,async t=>{t.stopPropagation(),await n(e.id,`doing`),await l()}),a.querySelector(`.edit`)?.addEventListener(`click`,t=>{t.stopPropagation();let n=document.querySelector(`.editContainer`);if(!n)return;n.innerHTML=``;let r=document.createElement(`form`);r.innerHTML=`
                              <h2 class="editTitel">Edit task: </h2>
                              <label for="titel">Titel:</label>
                              <input type="text" id="titel" name="titel" value="${e.title}">

                              <label for="pName">Project name:</label>
                              <input type="text" id="pName" name="pName" 
                              value="${e.project}">

                              <label for="description">Description:</label>
                              <input type="text" id="description" name="description" 
                              value="${e.description}">

                              <label for="deadline">Deadline:</label>
                              <input
                                   type="datetime-local"
                                   id="deadline"
                                   name="deadline"
                                   value="2026-06-12T19:30" 
                              />

                              <label for="category">Role:</label>
                              <select id="category" name="category">
                                   <option value="ux" ${e.category===`ux`?`selected`:``}>UX</option>

                                   <option value="frontend" ${e.category===`frontend`?`selected`:``}>
                                        Frontend
                                   </option>

                                   <option value="backend" ${e.category===`backend`?`selected`:``}>
                                        Backend
                                   </option>
                              </select>

                              <input class="Savebtn" type="submit" value="Save">
                         `,n?.append(r),r.addEventListener(`submit`,async t=>{t.preventDefault(),t.stopPropagation();let n=r.querySelector(`#titel`).value,a=r.querySelector(`#pName`).value,o=r.querySelector(`#description`).value,s=r.querySelector(`#deadline`).value,c=r.querySelector(`#category`).value,u=await i(e.id,n,a,o,s,e.status,c);alert(u.message),await l()})}),t.append(a))}),e.status===`done`){let n=document.createElement(`button`);n.classList=`delete-btn`,n.textContent=`X`,n.addEventListener(`click`,async n=>{n.stopPropagation();let r=await o(e.id);alert(r.message),t.remove()}),t.append(n)}})};t().then(d).then(u);