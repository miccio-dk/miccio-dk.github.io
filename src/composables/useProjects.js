import { ref } from 'vue'
import matter from 'gray-matter'

export function useProjects() {
  const projects = ref([])

  // Dynamically import all individual project markdown files
  const projectModules = import.meta.glob('../data/projects/*.md', { as: 'raw', eager: true })

  // Parse each project file and add it to the projects array
  projects.value = Object.values(projectModules).map(rawContent => {
    const { data, content } = matter(rawContent, { engine: 'js' })
    return { ...data, descr: content.trim() }
  })

  return { projects }
}
