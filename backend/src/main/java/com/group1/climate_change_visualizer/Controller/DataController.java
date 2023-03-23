package com.group1.climate_change_visualizer.Controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;


import com.group1.climate_change_visualizer.Data.DataService;
import com.group1.climate_change_visualizer.Data.Data;

@RestController
public class DataController {
    private DataService dataService;


    @Autowired
    public DataController(DataService dataService) {
        this.dataService = dataService;
    }

    @GetMapping("/data") // Get all data
    public ResponseEntity<?> getData() {
        return ResponseEntity.status(HttpStatus.OK).body(dataService.getData());
    }

    @PostMapping("/data") // Add data
    public ResponseEntity<?> addData(@PathVariable String dataName, @RequestBody String dataValue) {
        Data data = dataService.getData(dataName, dataValue);
        if (data != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("This data with name " + dataName + " is already in the database.");
        }

        dataService.addData(dataName, dataValue);

        return ResponseEntity.status(HttpStatus.CREATED).body("A new data with name " + dataName + " has been created.");
    }

}
