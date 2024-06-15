package org.backend.backend.controllers;


import org.backend.backend.model.*;
import org.backend.backend.repositories.*;
import org.backend.backend.repositories.Assignment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class controller {


    private final Teacher_repo teacher_repo;
    private final Student_repo studentRepo;
    private final Class_repo class_repo;
    private final Materials_repo materials_repo;
    private final Assignment assignment;
    private final StudentClass studentClass;

    @Autowired
    controller(Student_repo studentRepo, Teacher_repo teacher_repo, Class_repo classRepo, Materials_repo materialsRepo, Assignment assignment, StudentClass studentClass) {
        this.studentRepo = studentRepo;
        this.teacher_repo = teacher_repo;
        class_repo = classRepo;
        materials_repo = materialsRepo;
        this.assignment = assignment;
        this.studentClass = studentClass;
    }

    public String generateRandomCode() {
        int leftLimit = 48; // '0'
        int rightLimit = 122; // 'z'

        // Exclude characters that are not alphanumeric
        int excludedCharCount = rightLimit - 57 + 1; // Range of non-alphanumeric characters (from ':' to '[')
        rightLimit -= excludedCharCount;

        int length = 8;
        Random random = new Random();
        StringBuilder builder = new StringBuilder(length);

        while (builder.length() < length) {
            int randomLimitedInt = leftLimit + (int) (random.nextDouble() * (rightLimit - leftLimit + 1));
            char c = (char) randomLimitedInt;

            // Ensure character is alphanumeric before appending
            if (Character.isLetterOrDigit(c)) {
                builder.append(c);
            }
        }

        return builder.toString();
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
        String code = generateRandomCode();
        while (class_repo.findById(code).isPresent()) {
            code = generateRandomCode();
        }
        classes.setClass_id(code);
        class_repo.save(classes);


        List<Classes> classesLis;
        classesLis = class_repo.findClassesByTeacher_id(uid);
        return ResponseEntity.ok(classesLis);
    }


    @GetMapping("/classes/get_all/{uid}/{role}")
    public ResponseEntity<List<Classes>> get_all_classes(@PathVariable String uid, @PathVariable String role) {
        List<Classes> classesList;
        if (role.equals("Teacher")) {
            classesList = class_repo.findClassesByTeacher_id(uid);
            return ResponseEntity.ok(classesList);
        }
        classesList = class_repo.findAll();
        return ResponseEntity.ok(classesList);
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
        String code = generateRandomCode();
        while (materials_repo.findByCode(code) != null) {
            code = generateRandomCode();
        }
        String class_code = data.get("code").toString();
        String title = data.get("title").toString();
        String description = data.get("description").toString();
        List<String> urls = (List<String>) data.get("urls");
        List<String> file_names = (List<String>) data.get("file_names");
        Materials materials = new Materials(title, description, urls, file_names, class_code, code);
        materials_repo.save(materials);
        List<Materials> materialsList = materials_repo.findByClass_id(class_code);
        return ResponseEntity.ok(materialsList);
    }

    @GetMapping("materials/{code}")
    public ResponseEntity<List<Materials>> get_materials(@PathVariable String code) {
        List<Materials> list = materials_repo.findByClass_id(code);
        return ResponseEntity.ok(list);
    }

    @DeleteMapping("materials/{class_code}/{material_code}")
    public ResponseEntity<List<Materials>> delete_material(@PathVariable String class_code, @PathVariable String material_code) {
        Materials material = materials_repo.findByCode(material_code);
        materials_repo.delete(material);
        List<Materials> materialsList = materials_repo.findByClass_id(class_code);
        return ResponseEntity.ok(materialsList);
    }

    @PostMapping("Assignment/{class__code}")
    public ResponseEntity<List<org.backend.backend.model.Assignment>> add_assignment(@PathVariable String class__code, @RequestBody Map<String, Object> data) {

        String code = generateRandomCode();

        while (assignment.findByUniqueCode(code) != null) {
            code = generateRandomCode();
        }
        String title = data.get("title").toString();
        String description = data.get("description").toString();
//        Date lastdate = (Date) data.get("sub_date");
        Date lastdate = new Date();
        System.out.println(data.get("sub_date").toString());
        boolean latesub = (boolean) data.get("late_sub");

        org.backend.backend.model.Assignment assignment1 = new org.backend.backend.model.Assignment(title, description, lastdate, latesub, code, class__code);
        assignment.save(assignment1);

        return ResponseEntity.ok(assignment.findByClassCode(class__code));

    }

    @PostMapping("JoinClass/{uid}/{code}")
    ResponseEntity<List<Classes>> join_class(@PathVariable String uid, @PathVariable String code) {

        Optional<Classes> optionalClasses = class_repo.findById(code);
        if (optionalClasses.isEmpty()) return ResponseEntity.ok(null);

        Optional<org.backend.backend.model.Student_Class> student_class = studentClass.findById(uid);
        if (student_class.isPresent()) {
            List<String> codes = student_class.get().getCodes();

            if (codes.contains(code)) {
                return ResponseEntity.ok(null);
            }
            codes.add(code);
            student_class.get().setCodes(codes);
            studentClass.save(student_class.get());

            List<Classes> classesList = new ArrayList<>();
            Optional<Classes> optionalClasses1;
            for (String code1 : codes) {
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

    @DeleteMapping("/RemoveClass/{uid}/{code}")
    ResponseEntity<List<Classes>> class_remove(@PathVariable String uid, @PathVariable String code) {
        Optional<Student_Class> student_class = studentClass.findById(uid);
        if (student_class.isPresent()) {
            List<String> codes = student_class.get().getCodes();
            codes.remove(code);
            student_class.get().setCodes(codes);
            studentClass.save(student_class.get());
            List<Classes> classesList = new ArrayList<>();
            Optional<Classes> optionalClasses1;
            for (String code1 : codes) {
                optionalClasses1 = class_repo.findById(code1);
                optionalClasses1.ifPresent(classesList::add);
            }
            return ResponseEntity.ok(classesList);
        } else {
            return ResponseEntity.ok(null);
        }
    }


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
