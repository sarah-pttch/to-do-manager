package com.example.backend.service;

import com.example.backend.dto.CategoryDto;
import com.example.backend.dto.CategoryMapper;
import com.example.backend.entity.Category;
import com.example.backend.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public CategoryDto createCategory(CategoryDto categoryDto) {
        Category createdCategory = categoryRepository.save(CategoryMapper.toEntity(categoryDto));
        return CategoryMapper.toDto(createdCategory);
    }

    public Iterable<CategoryDto> getAllCategories() {
        Iterable<Category> allCategories = categoryRepository.findAll();
        return StreamSupport.stream(allCategories.spliterator(), false)
                .map(CategoryMapper::toDto).collect(Collectors.toList());
    }

    public void deleteCategory(Integer id) {
        categoryRepository.deleteById(id);
    }
}
