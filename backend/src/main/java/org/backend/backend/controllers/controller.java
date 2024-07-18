package org.backend.backend.controllers;


import org.backend.backend.model.*;
import org.backend.backend.repositories.*;
import org.backend.backend.repositories.Assignment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin(origins = {"https://edu-connect-with-spring-and-react.vercel.app/","https://vercel.com/nisarg155s-projects/edu-connect-with-spring-and-react/C1NyvrTq1TJMyLYhHS49nyCfqumD/" , "https://edu-connect-with-spring-and-react-fne2qdqxg-nisarg155s-projects.vercel.app/"})
@RequestMapping("/api")
public class controller {


    private final Teacher_repo teacher_repo;
    private final Student_repo studentRepo;
    private final Class_repo class_repo;
    private final Materials_repo materials_repo;
    private final Assignment assignment;
    private final StudentClass studentClass;
    private final Submission submissions_repo;

    @Autowired
    controller(Student_repo studentRepo, Teacher_repo teacher_repo, Class_repo classRepo, Materials_repo materialsRepo, Assignment assignment, StudentClass studentClass, Submission submission, Submission submissionsRepo) {
        this.studentRepo = studentRepo;
        this.teacher_repo = teacher_repo;
        class_repo = classRepo;
        materials_repo = materialsRepo;
        this.assignment = assignment;
        this.studentClass = studentClass;
        submissions_repo = submissionsRepo;
    }

    public String generateRandomCode(int length) {
        String SALTCHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz";
        StringBuilder salt = new StringBuilder();
        Random rnd = new Random();
        while (salt.length() < length) { // length of the random string.
            int index = (int) (rnd.nextFloat() * SALTCHARS.length());
            salt.append(SALTCHARS.charAt(index));
        }
        String saltStr = salt.toString();
        return saltStr;
    }

    @GetMapping("/")
    public  String initial_url()
    {
        System.out.println("hello");
        return "Hello World";
    }

    @PostMapping("/student/create")
    public String create_new_student(@RequestBody Student student) {
        return (studentRepo.save(student)).getStudent_id();
    }

    @PostMapping("/teacher/create")
    public String create_new_teacher(@RequestBody Teacher teacher) {
        return (teacher_repo.save(teacher)).getTeacher_id();
    }


    @DeleteMapping("/classes/delete/{code}/{uid}")
    public ResponseEntity<List<Classes>> delete_class(@PathVariable String code, @PathVariable String uid) {
        class_repo.deleteById(code);
        return ResponseEntity.ok(class_repo.findClassesByTeacher_id(uid));
    }

    @PostMapping("/classes/create/{uid}/{name}")
    public ResponseEntity<List<Classes>> create_new_class(@RequestBody Classes classes, @PathVariable String uid, @PathVariable String name) throws NoSuchElementException {
        // finds the teacher based on uid
        classes.setTeacher_id(uid);
        classes.setTeacher_name(name);
        String code = generateRandomCode(8);
        while (class_repo.findById(code).isPresent()) {
            code = generateRandomCode(8);
        }
        classes.setClass_id(code);
        class_repo.save(classes);
        return ResponseEntity.ok(class_repo.findClassesByTeacher_id(uid));
    }


    @GetMapping("/classes/get_all/{uid}/{role}")
    public ResponseEntity<List<Classes>> get_all_classes(@PathVariable String uid, @PathVariable String role) {
        List<Classes> classes = class_repo.findClassesByTeacher_id(uid);
        for (Classes c : classes) {
            System.out.println(c.toString());
        }
            return ResponseEntity.ok( class_repo.findClassesByTeacher_id(uid));
    }

    @PutMapping("/classes/edit")
    public ResponseEntity<List<Classes>> edit_class(@RequestBody Classes classes) {
        List<Classes> classesList;
        class_repo.save(classes);
        classesList = class_repo.findClassesByTeacher_id(classes.getTeacher_id());

        return ResponseEntity.ok(classesList);
    }

    @PostMapping("/material/upload")
    public ResponseEntity<List<Materials>> upload_material(@RequestBody Map<String, Object> data) {
        String code = generateRandomCode(16);
        while (materials_repo.findByCode(code) != null) {
            code = generateRandomCode(16);
        }
        String class_code = data.get("code").toString();
        String title = data.get("title").toString();
        String description = data.get("description").toString();
        List<String> urls = (List<String>) data.get("urls");
        List<String> file_names = (List<String>) data.get("file_names");
        Materials materials = new Materials(title, description, urls, file_names, class_code, code);
        materials_repo.save(materials);
        return ResponseEntity.ok(materials_repo.findByClass_id(class_code));
    }

    @GetMapping("materials/{code}")
    public ResponseEntity<List<Materials>> get_materials(@PathVariable String code) {
        return ResponseEntity.ok(materials_repo.findByClass_id(code));
    }

    @DeleteMapping("materials/{class_code}/{material_code}")
    public ResponseEntity<List<Materials>> delete_material(@PathVariable String class_code, @PathVariable String material_code) {
        Materials material = materials_repo.findByCode(material_code);
        materials_repo.delete(material);
        return ResponseEntity.ok(materials_repo.findByClass_id(class_code));
    }

    @PostMapping("Assignment/{class__code}")
    public ResponseEntity<List<org.backend.backend.model.Assignment>> add_assignment(@PathVariable String class__code, @RequestBody Map<String, Object> data) {

        String code = generateRandomCode(16);

        while (assignment.findByUniqueCode(code) != null) {
            code = generateRandomCode(16);
        }
        String title = data.get("title").toString();
        String description = data.get("description").toString();
//        Date lastdate = (Date) data.get("sub_date");
        String lastdate =  data.get("sub_date").toString();
        System.out.println(lastdate);
        boolean latesub = (boolean) data.get("late_sub");

        org.backend.backend.model.Assignment assignment1 = new org.backend.backend.model.Assignment(title, description, lastdate, latesub, code, class__code);
        assignment.save(assignment1);

        return ResponseEntity.ok(assignment.findByClassCode(class__code));

    }

    @GetMapping("get_assignments/{code}")
    public ResponseEntity<List<org.backend.backend.model.Assignment>> get_assignments(@PathVariable String code) {
        return ResponseEntity.ok(assignment.findByClassCode(code));
    }

    @GetMapping("verify_code/{code}")
    public ResponseEntity<Boolean> verify_code(@PathVariable String code) {
        return ResponseEntity.ok(class_repo.findById(code).isPresent());
    }

    @PostMapping("JoinClass/{uid}/{code}/{name}")
    ResponseEntity<List<Classes>> join_class(@PathVariable String uid, @PathVariable String code, @PathVariable String name) {
        System.out.println(name);

        Optional<org.backend.backend.model.Student_Class> student_class = studentClass.findById(uid);
        Optional<Classes> classesOptional = class_repo.findById(code);
        if(classesOptional.isPresent()) {
            classesOptional.get().addStudent_id(uid);
            classesOptional.get().addStudent_name(name);
            class_repo.save(classesOptional.get());
        }
        if (student_class.isPresent()) {
           student_class.get().addCode(code);
            studentClass.save(student_class.get());

            List<Classes> classesList = new ArrayList<>();
            Optional<Classes> optionalClasses1;
            for (String code1 : student_class.get().getCodes()) {
                optionalClasses1 = class_repo.findById(code1);
                optionalClasses1.ifPresent(classesList::add);
            }
            return ResponseEntity.ok(classesList);
        } else {
            List<String> codes = new ArrayList<>();
            codes.add(code);
            org.backend.backend.model.Student_Class student_class1 = new org.backend.backend.model.Student_Class(uid, codes);
            studentClass.save(student_class1);
            Optional<Classes> classes = class_repo.findById(code);
            return classes.map(value -> ResponseEntity.ok(Collections.singletonList(value))).orElseGet(() -> ResponseEntity.ok(null));
        }
    }

    @GetMapping("get_classes_student/{uid}")
    public ResponseEntity<List<Classes>> get_classes_student(@PathVariable String uid) {
        Optional<Student_Class> student_class = studentClass.findById(uid);

        if(student_class.isPresent()) {
            List<Classes> classesList = new ArrayList<>();
            Optional<Classes> optionalClasses1;
            List<String> codes = student_class.get().getCodes();
            for (String code1 : codes) {
                optionalClasses1 = class_repo.findById(code1);
                optionalClasses1.ifPresent(classesList::add);
            }
            return ResponseEntity.ok(classesList);
        }
        return ResponseEntity.ok(null);
    }

    @DeleteMapping("/RemoveClass/{uid}/{code}")
    ResponseEntity<List<Classes>> class_remove(@PathVariable String uid, @PathVariable String code) {
        Optional<Student_Class> student_class = studentClass.findById(uid);
        Optional<Classes> classesOptional = class_repo.findById(code);
        if (student_class.isPresent() && classesOptional.isPresent()) {
            int index = classesOptional.get().getStudent_ids().indexOf(uid);
           classesOptional.get().removeStudent_id_and_Student_name(uid);
            student_class.get().removeCode(code);
            List<Classes> classesList = new ArrayList<>();
            Optional<Classes> optionalClasses1;
            for (String code1 : student_class.get().getCodes()) {
                optionalClasses1 = class_repo.findById(code1);
                optionalClasses1.ifPresent(classesList::add);
            }
            studentClass.save(student_class.get());
            class_repo.save(classesOptional.get());
            return ResponseEntity.ok(classesList);
        } else {
            return ResponseEntity.ok(null);
        }
    }

    @PostMapping("submission/{uid}/{classId}")
    ResponseEntity<List<submissions>> submission(@RequestBody submissions submission, @PathVariable String uid, @PathVariable String classId)
    {
        submissions_repo.save(submission);
        return ResponseEntity.ok(submissions_repo.findByClassCode(classId,uid));
    }

    @GetMapping("submissions/{uid}/{classId}")
    ResponseEntity<List<submissions>> get_submissions(@PathVariable String uid, @PathVariable String classId)
    {
        return ResponseEntity.ok(submissions_repo.findByClassCode(classId,uid));
    }

    @GetMapping("submissions_by_assignment/{assignment_id}")
    ResponseEntity<List<submissions>> get_submission_by_assignment_id(@PathVariable String assignment_id )
    {
        List<submissions> submissionsList = submissions_repo.findByAssignmentId(assignment_id);
        return ResponseEntity.ok(submissionsList);
    }

    @GetMapping("get_students/{code}")
    ResponseEntity<Map<String,Object>> get_students(@PathVariable String code)
    {
        Map<String,Object> stringObjectMap = new HashMap<>();
        Optional<Classes> optionalClasses = class_repo.findById(code);
        if(optionalClasses.isPresent()) {
            stringObjectMap.put("student_id",optionalClasses.get().getStudent_ids());
            stringObjectMap.put("student_name",optionalClasses.get().getStudent_names());
        }
        return ResponseEntity.ok(stringObjectMap);
    }

//    @PostMapping("/submission")
//    ResponseEntity<List<submissions>> submissions(@RequestBody Map<String, Object> data) {
//        List<String> codes = (List<String>) data.get("codes");
//
//    }



//     @PostMapping("teacher/create")
//     public
//
//     @PostMapping()
//
//     @PostMapping("/create")
//     public String create(@RequestBody users u) throws ExecutionException, InterruptedException {
//         return fbs.create(u);
//     }
}
