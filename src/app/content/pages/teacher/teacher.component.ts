import { Component, OnInit } from '@angular/core';
//NG-BOOTSTRAP
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//SERVICIOS
import { CourseService } from 'src/app/core/services/API/course.service';
//MODALS
import { CreateCourseComponent } from './modals/create-course/create-course.component';
import { CreateCategoryComponent } from './modals/create-category/create-category.component';
import { CreateSubcategoryComponent } from './modals/create-subcategory/create-subcategory.component';
import { CreateQuestionComponent } from './modals/create-question/create-question.component';
import { SessionService } from 'src/app/core/services/API/session.service';
//NGX-TOASTR
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/core/services/API/category.service';
import { SubcategoryService } from 'src/app/core/services/API/subcategory';
import { QuestionService } from 'src/app/core/services/API/question.service';

@Component({
   selector: 'cw-teacher',
   templateUrl: './teacher.component.html',
   styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {

   courses;
   categories;
   subcategories;
   questions;

   options;
   options2

   id_user = this._sessionSrv.userSubject.value.id_user;

   constructor(
      private _courseSrv: CourseService,
      private _sessionSrv: SessionService,
      private ngModal: NgbModal,
      private _categorySrv: CategoryService,
      private _subcategorySrv: SubcategoryService,
      private _questionSrv: QuestionService,
      private toastr: ToastrService
   ) { }

   ngOnInit() {
      this.getLastCourses();
      this.getLastCategories();
      this.getLastSubcategories();
      this.getLastQuestions();

      //DATOS NECESATIOS PARA EL GRÁFICO DE DONA:
      //! NECESITO HABER INICIADO UN CURSO PARA HACER ESTAS PRUEBAS!!!!!
      //OBTENER ÚLTIMOS CURSOS EN LOS CUALES SE REALIZARON PREGUNTAS (FROM QUESTION_CLASS?? WHERE ID_USER)..
      //OBTENER -CANTIDAD DE PREGUNTAS- DE UN USUARIO
      //TOTAL PREGUNTAS - PREGUNTAS RESPONDIDAS

      this.options = {
         //backgroundColor: 'pink',
         //
         title: {
            text: 'Preguntas:',
            //left: 'right',
            right: '25',
            padding: [5, 0],
            top: '40',
            //backgroundColor: 'yellow',
            textStyle: {
               color: '#666674',
               fontFamily: 'sans-serif',
               align: 'left',
               //verticalAlign: 'middle'
            }
         },
         color: ['#D6D7E1', '#34BFA3'],
         tooltip: {
            trigger: 'item',
            formatter: "{a} <br/> {b}: {c}"
         },
         legend: {
            orient: 'vertical',
            x: 'right',
            y: 'middle',
            align: 'left',
            itemWidth: 32,
            data: ['Faltantes', 'Realizadas'],
            itemStyle: {
               fontSize: 20
            },
            textStyle: {
               color: '#666674',
               fontWeight: 600,
               fontFamily: 'sans-serif',
               fontSize: 14,
               padding: [0, 0, 0, 5]
            }
         },
         series: [
            {
               name: 'Preguntas',
               type: 'pie',
               selectedMode: 'single',
               radius: ['60%', '85%'],
               center: ['35%', '49%'],
               itemStyle: {
                  normal: {
                     shadowBlur: 5,
                     shadowOffsetX: 0,
                     shadowColor: 'rgba(0, 0, 0, 0.5)',
                  },
                  // emphasis: {
                  //   shadowBlur: 8,
                  //   shadowOffsetX: 0,
                  //   shadowColor: 'rgba(0, 0, 0, 0.2)',
                  // },
               },
               labelLine: { //eliminar las líneas por fuera del chart
                  show: false
               },
               avoidLabelOverlap: false,
               label: {
                  // normal: {
                  //   show: false,
                  //   position: 'center',
                  // },
                  emphasis: {
                     show: true,
                     zlevel: 100,
                     position: 'center',
                     textStyle: {
                        fontSize: '25',
                        fontWeight: 'bold',
                        color: '#666674'
                     },
                     formatter: "{d}%"
                  }
               },
               data: [
                  {
                     value: 335,
                     name: 'Faltantes',
                     //avoidLabelOverlap: true,
                     label: {
                        normal: {
                           show: false
                        },
                        emphasis: {
                           show: false,
                           position: 'center'
                        }
                     }
                  },
                  {
                     value: 1548, //CANTIDAD DE PREGUNTAS RESPONDIDAS
                     name: 'Realizadas',
                     avoidLabelOverlap: false,
                     label: {
                        normal: {
                           position: 'center',
                           formatter: '{d}%',
                           textStyle: {
                              fontSize: '25',
                              fontWeight: 'bold',
                              color: '#666674'
                           },
                           emphasis: {
                              position: 'center'
                           }
                        },
                     }
                  }
               ]
            }
         ]
      };


   }



   openCreateCourse() {
      const modalRef = this.ngModal.open(CreateCourseComponent);
   }

   openCreateAnswer() {
      const modalRef = this.ngModal.open(CreateQuestionComponent,{
         size: "lg"
      });
   }

   openCreateCategory() {
      const modalRef = this.ngModal.open(CreateCategoryComponent);
   }

   openCreateSubcategory() {
      const modalRef = this.ngModal.open(CreateSubcategoryComponent);
   }


   getLastCourses() {
      this._courseSrv.getCoursesByTeacherId(this.id_user)
         .subscribe(
            result => {
               console.log("last courses: ", result);
               this.courses = result;
               this.options2 = {
                  //backgroundColor: 'pink',
                  //
                  title: {
                     text: 'Preguntas:',
                     //left: 'right',
                     right: '25',
                     padding: [5, 0],
                     top: '40',
                     //backgroundColor: 'yellow',
                     textStyle: {
                        color: '#666674',
                        fontFamily: 'sans-serif',
                        align: 'left',
                        //verticalAlign: 'middle'
                     }
                  },
                  color: ['#D6D7E1', '#34BFA3'],
                  tooltip: {
                     trigger: 'item',
                     formatter: "{a} <br/> {b}: {c}"
                  },
                  legend: {
                     orient: 'vertical',
                     x: 'right',
                     y: 'middle',
                     align: 'left',
                     itemWidth: 32,
                     data: ['Faltantes', 'Realizadas'],
                     itemStyle: {
                        fontSize: 20
                     },
                     textStyle: {
                        color: '#666674',
                        fontWeight: 600,
                        fontFamily: 'sans-serif',
                        fontSize: 14,
                        padding: [0, 0, 0, 5]
                     }
                  },
                  series: [
                     {
                        name: 'Preguntas',
                        type: 'pie',
                        selectedMode: 'single',
                        radius: ['60%', '85%'],
                        center: ['35%', '49%'],
                        itemStyle: {
                           normal: {
                              shadowBlur: 5,
                              shadowOffsetX: 0,
                              shadowColor: 'rgba(0, 0, 0, 0.5)',
                           },
                           // emphasis: {
                           //   shadowBlur: 8,
                           //   shadowOffsetX: 0,
                           //   shadowColor: 'rgba(0, 0, 0, 0.2)',
                           // },
                        },
                        labelLine: { //eliminar las líneas por fuera del chart
                           show: false
                        },
                        avoidLabelOverlap: false,
                        label: {
                           // normal: {
                           //   show: false,
                           //   position: 'center',
                           // },
                           emphasis: {
                              show: true,
                              zlevel: 100,
                              position: 'center',
                              textStyle: {
                                 fontSize: '25',
                                 fontWeight: 'bold',
                                 color: '#666674'
                              },
                              formatter: "{d}%"
                           }
                        },
                        data: [
                           {
                              //value: this.courses[0].teacher_goal - this.courses[0].student_goal,
                              value: 454 - 81, //PREGUNTAS RESPONDIDAS - PREGUNTAS TOTALES
                              name: 'Faltantes',
                              //avoidLabelOverlap: true,
                              label: {
                                 normal: {
                                    show: false
                                 },
                                 emphasis: {
                                    show: false,
                                    position: 'center'
                                 }
                              }
                           },
                           {
                              value: 81, //CANTIDAD DE PREGUNTAS RESPONDIDAS 2
                              //value: this.courses[0].student_goal,
                              name: 'Realizadas',
                              avoidLabelOverlap: false,
                              label: {
                                 normal: {
                                    position: 'center',
                                    formatter: '{d}%',
                                    textStyle: {
                                       fontSize: '25',
                                       fontWeight: 'bold',
                                       color: '#666674'
                                    },
                                    emphasis: {
                                       position: 'center'
                                    }
                                 },
                              }
                           }
                        ]
                     }
                  ]
               };
            },
            error => {
               console.log("error: ", error);
            }
         );
   }

   getLastCategories() {
      this._categorySrv.getLastCategoriesByTeacherId(this.id_user)
         .subscribe(
            result => {
               //console.log("resultH: ", result);
               this.categories = result;
            },
            error => {
               console.log("error: ", error);
            }
         );
   }

   getLastSubcategories() {
      this._subcategorySrv.getLastSubcategoriesByTeacherId(this.id_user)
         .subscribe(
            result => {
               //console.log("resultH: ", result);
               this.subcategories = result;
            },
            error => {
               console.log("error: ", error);
            }
         );
   }

   getLastQuestions() {
      this._questionSrv.getLastQuestionsByTeacherId(this.id_user)
         .subscribe(
            result => {
               console.log("questions: ", result);
               this.questions = result;
            },
            error => {
               console.log("error: ", error);
            }
         );
   }
}
