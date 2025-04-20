package com.ayrton.Services.Dao;

import jakarta.transaction.Transactional;

public interface Idao <T,ID>{
    public T getById(ID id);
    @Transactional
    public  void save(T obje);

    @Transactional
    public void saveAll(Iterable<T> obje);

    @Transactional
    public void delete(T obje);
}
