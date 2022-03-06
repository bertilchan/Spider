import cheerio from 'cheerio'
import fs from 'fs'
import { Analyzer } from './crowller'

interface Course {
  title: string;
  count: number;
}

interface CourseResult {
  time: number;
  data: Course[];
}

interface Content {
  [propname: number]: Course[];
}

export default class DellAnalyzer implements Analyzer {
  private static instance: DellAnalyzer;

  static getInstance() {
    if(!DellAnalyzer.instance) {
      DellAnalyzer.instance = new DellAnalyzer()
    }
    return DellAnalyzer.instance
  }

  // 提取课程信息
  private getCourseInfo(html: string) {
    const $ = cheerio.load(html)
    const courseItems = $('.course-item')
    const courseInfos: Course[] = []
    courseItems.map((index, element)=>{
      const descs = $(element).find('.course-desc')
      const title = descs.eq(0).text()
      const count = parseInt(descs.eq(1).text().split('：')[1])
      courseInfos.push({ title, count })
    })
    return {
      time: new Date().getTime(),
      data: courseInfos
    }
  }

  // 生成json内容
  private generateJsonContent(courseInfo: CourseResult, filePath: string) {
    let fileContent: Content = {}
    if(fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    }
    fileContent[courseInfo.time] = courseInfo.data
    return JSON.stringify(fileContent)
  }

  public analyze(html: string, filePath:string) {
    const courseInfo = this.getCourseInfo(html)
    const fileContent = this.generateJsonContent(courseInfo, filePath)
    return fileContent
  }

  private constructor() {}
}