package de.illusioni.goodui.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/events/{id:[0-9][0-9]*}")
public class EventController {

    @RequestMapping(method = RequestMethod.GET)
    public String printWelcome(ModelMap model, @PathVariable("id") long id) {

        model.addAttribute("id", id);
        return "eventJson";

    }

}