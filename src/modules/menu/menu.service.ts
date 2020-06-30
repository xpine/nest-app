import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import { Repository, EntityManager, Transaction } from 'typeorm';
import { Menu } from './menu.entity';
import { CreateMenuDto, UpdateMenuDto } from './dto';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
    @InjectEntityManager()
    private menuManager: EntityManager,
  ) {}

  async getMenu(id) {
    const repository = this.menuManager.getTreeRepository(Menu);
    return repository.findOne(id, {
      relations: ['children'],
    });
  }

  findByIds(ids) {
    return this.menuRepository.findByIds(ids);
  }

  deleteMenu(id) {
    const repository = this.menuManager.getTreeRepository(Menu);
    return repository.softDelete(id);
  }
  /**
   * 创建菜单
   * @param createMenuDto
   */
  async create(createMenuDto: CreateMenuDto) {
    const repository = this.menuManager.getTreeRepository(Menu);
    const menu = repository.create(createMenuDto);
    const parent = await repository.findOne(createMenuDto.parentId);
    if (parent) {
      menu.parent = parent;
    }
    return repository.save(menu);
  }

  async update(id: string, updateDto: UpdateMenuDto) {
    return this.menuRepository.update(id, updateDto);
  }

  /**
   * 根据父节点id获取子菜单列表
   * @param id  父节点id
   */
  getSubMenus(id?: string) {
    return this.menuRepository.find({
      where: {
        parentId: id,
      },
    });
  }

  /**
   * 根据父节点id获取菜单树，如果找不到对应的父节点，则返回全部。
   * @param id 父节点id
   *
   */
  async getMenuTree(id?: string) {
    const repository = this.menuManager.getTreeRepository(Menu);

    if (id) {
      const m = await repository.findOne(id);
      return this.sort([await repository.findDescendantsTree(m)]);
    }
    return this.sort(await repository.findTrees());
  }

  sort(menus: Menu[]): Menu[] {
    menus.sort((a, b) => a.sort - b.sort);
    menus.forEach(menu => {
      if (menu.children && menu.children.length) {
        this.sort(menu.children);
      }
    });
    return menus;
  }
}
